import blogReducer, { getPostList, addPost, updatePost, deletePost } from './blog.reducer'
import { PostState, Post } from 'pages/types/blog.type'
import thunk, { ThunkDispatch } from 'redux-thunk'
import configureStore from 'redux-mock-store'
import service from 'utils/http'

const middlewares = [thunk]
const mockStore = configureStore<PostState, any>(middlewares)
// Testing method editPost, deletePost, cancelEditPost
describe('blogReducer handle action method', () => {
  let initialState: PostState
  beforeEach(() => {
    initialState = {
      postList: [],
      editingPost: null,
      loading: false,
      currentRequestId: undefined,
      search: '',
      publish: false
    }
  })

  it('should handle blogReducer action editPost', () => {
    const postId = '1'
    const post = {
      id: '1',
      title: 'Test post',
      description: 'Lorem ipsum',
      publishDate: new Date().toLocaleString(),
      featuredImage: 'update.jpg',
      published: true
    }
    initialState.postList = [post]
    const action = blogReducer.actions.editPost(postId)
    const newState = blogReducer.reducer(initialState, action)
    expect(newState.editingPost).toEqual(post)
  })
  it('should handle blogReducer action deletePost', () => {
    const postId = '1'
    const post = {
      id: '1',
      title: 'Test post',
      description: 'Lorem ipsum',
      publishDate: new Date().toLocaleString(),
      featuredImage: 'update.jpg',
      published: true
    }
    initialState.postList = [post]
    const action = blogReducer.actions.deletePost(postId)
    const newState = blogReducer.reducer(initialState, action)
    expect(newState.postList).toEqual([])
  })
  it('should handle blogReducer action cancel', () => {
    const post = {
      id: '1',
      title: 'Test post',
      description: 'Lorem ipsum',
      publishDate: new Date().toLocaleString(),
      featuredImage: 'update.jpg',
      published: true
    }
    initialState.editingPost = post
    const action = blogReducer.actions.cancelEditPost()
    const newState = blogReducer.reducer(initialState, action)
    expect(newState.editingPost).toEqual(null)
  })
})
jest.mock('utils/http')

describe('blogReducer handle async function', () => {
  let store: ReturnType<typeof mockStore>
  let dispatch: ThunkDispatch<any, any, any>
  beforeEach(() => {
    store = mockStore({
      postList: [],
      editingPost: null,
      loading: false,
      currentRequestId: undefined,
      search: '',
      publish: false
    })
    dispatch = store.dispatch
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  const mockResponse: Post[] = [
    {
      id: '1',
      title: 'Test post',
      description: 'Lorem ipsum',
      publishDate: new Date().toLocaleString(),
      featuredImage: 'update.jpg',
      published: true
    },
    {
      id: '1',
      title: 'Test post',
      description: 'Lorem ipsum',
      publishDate: new Date().toLocaleString(),
      featuredImage: 'update.jpg',
      published: true
    }
  ]
  beforeEach(() => {
    // Mock the API response for each test case
    ;(service.getAPI as jest.Mock).mockResolvedValueOnce(mockResponse)
    ;(service.postAPI as jest.Mock).mockResolvedValueOnce(mockResponse[0])
    ;(service.putAPI as jest.Mock).mockResolvedValueOnce(mockResponse[0])
    ;(service.deleteAPI as jest.Mock).mockResolvedValueOnce(undefined)
  })

  it('handle getPostList should fetch API and update the store', async () => {
    await dispatch(getPostList())

    const expectedActions = [
      { type: 'blogs/getPostList/pending' },
      { type: 'blogs/getPostList/fulfilled', payload: mockResponse }
    ]

    expect(store.getActions()).toEqual(expectedActions)
    const actions = store.getActions()
    const fulfilledAction = actions.find((a: any) => a.type === 'blogs/getPostList/fulfilled')
    const expectedPosts: Post[] = mockResponse
    const receivedPosts: Post[] = fulfilledAction.payload
    expect(receivedPosts).toEqual(expectedPosts)
  })
  it('handel addPost should add a new post and update the store', async () => {
    const newPost: Post = {
      id: '',
      title: 'New title',
      description: 'New description',
      publishDate: new Date().toLocaleString(),
      featuredImage: 'add.jpg',
      published: true
    }

    await dispatch(addPost(newPost))

    const expectedActions = [
      { type: 'blogs/addPost/pending' },
      { type: 'blogs/addPost/fulfilled', payload: mockResponse[0] },
      { type: 'blogs/getPostList/pending' },
      { type: 'blogs/getPostList/fulfilled', payload: mockResponse }
    ]

    expect(store.getActions()).toEqual(expectedActions)
    expect(service.postAPI).toHaveBeenCalledWith('posts', newPost, expect.anything())
    expect(service.getAPI).toHaveBeenCalledWith('posts', expect.anything())
  })

  it('handle updatePost should update an existing post and update the store', async () => {
    const updatedPost: Post = {
      id: '',
      title: 'update title',
      description: 'update description',
      publishDate: new Date().toLocaleString(),
      featuredImage: 'update.jpg',
      published: true
    }

    await dispatch(updatePost(updatedPost))

    const expectedActions = [
      { type: 'blogs/updatePost/pending' },
      { type: 'blogs/updatePost/fulfilled', payload: updatedPost },
      { type: 'blogs/getPostList/pending' },
      { type: 'blogs/getPostList/fulfilled', payload: mockResponse }
    ]

    expect(store.getActions()).toEqual(expectedActions)
    expect(service.putAPI).toHaveBeenCalledWith('posts/1', updatedPost, expect.anything())
    expect(service.getAPI).toHaveBeenCalledWith('posts', expect.anything())
  })

  it('handle deletePost should delete an existing post and update the store', async () => {
    const postId = '1'

    await dispatch(deletePost(postId))

    const expectedActions = [
      { type: 'blogs/deletePost/pending' },
      { type: 'blogs/deletePost/fulfilled', payload: postId },
      { type: 'blogs/getPostList/pending' },
      { type: 'blogs/getPostList/fulfilled', payload: mockResponse }
    ]

    expect(store.getActions()).toEqual(expectedActions)
    expect(service.deleteAPI).toHaveBeenCalledWith(`posts/${postId}`, expect.anything())
    expect(service.getAPI).toHaveBeenCalledWith('posts', expect.anything())
  })
})
