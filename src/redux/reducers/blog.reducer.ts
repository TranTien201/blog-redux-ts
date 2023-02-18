import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initialPostList } from 'constants/blog'
import { PostState, Post } from 'pages/types/blog.type'
const initialState: PostState = {
  postList: initialPostList,
  editingPost: null
}
const blogReducer = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.postList.push(action.payload)
    },
    editPost: (state, action: PayloadAction<string>) => {
      const getPostByID = state.postList.find((post) => post.id === action.payload) || null
      state.editingPost = getPostByID
    },
    deletePost: (state, action: PayloadAction<string>) => {
      const postID = state.postList.findIndex((post) => post.id === action.payload)
      if (postID !== -1) {
        state.postList.splice(postID, 1)
      }
    },
    cancelEditPost: (state) => {
      state.editingPost = null
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      state.postList.find((post, index) => {
        if (post.id === action.payload.id) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
    }
  }
})
export default blogReducer
