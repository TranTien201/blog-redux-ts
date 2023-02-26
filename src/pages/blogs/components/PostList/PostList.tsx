import PostItem from '../PostItem/PostItem'
import { useSelector } from 'react-redux'
import { blogLoading, blogRemainSelector, isPublishSelected } from 'redux/selectors/blog.selector'
import blogReducer, { deletePost, getPostList } from 'redux/reducers/blog/blog.reducer'
import filterBlogReducer from 'redux/reducers/blog/filter.reducer'
import { useEffect, useState, useRef } from 'react'
import { useAppDispatch } from 'redux/store'
import Skeleton from '../Skeleton'
import { Col, Row, Input, Select, Tag } from 'antd'

const PostList = () => {
  const postList = useSelector(blogRemainSelector)
  const dispatch = useAppDispatch()
  const loading = useSelector(blogLoading)
  const isPublish = useSelector(isPublishSelected)
  const timeOutRef = useRef<null | NodeJS.Timeout>(null)
  const [search, setSearch] = useState({
    text: '',
    tag: 'title'
  })
  useEffect(() => {
    const promise = dispatch(getPostList())
    // Clearn up function
    return () => {
      promise.abort()
    }
  }, [dispatch])

  const handelDeletePost = (postID: string) => {
    dispatch(deletePost(postID))
  }
  const handelEditPost = (postID: string) => {
    dispatch(blogReducer.actions.editPost(postID))
  }

  const handelSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({
      ...search,
      text: e.target.value
    })
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current)
    }
    timeOutRef.current = setTimeout(() => {
      dispatch(filterBlogReducer.actions.searchText(e.target.value))
    }, 500)
  }
  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Tran Tien's Blog</h2>
          <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>
            Đừng bao giờ từ bỏ. Hôm nay khó khăn, ngày mai sẽ trở nên tồi tệ. Nhưng ngày mốt sẽ có nắng
          </p>
        </div>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={24}>
            <Input.Group style={{ display: 'flex' }} compact>
              <Input value={search.text} onChange={handelSearchText} disabled={loading} />
              <Select
                // defaultValue={tag}
                value={search.tag}
                onChange={(value) => {
                  setSearch({
                    ...search,
                    tag: value
                  })
                  dispatch(filterBlogReducer.actions.changeTag(value))
                }}
              >
                <Select.Option value='title' label='Title'>
                  <Tag color='red'>Title</Tag>
                </Select.Option>
                <Select.Option value='description' label='Description'>
                  <Tag color='blue'>Description</Tag>
                </Select.Option>
              </Select>
            </Input.Group>
          </Col>
        </Row>
        <Row style={{ marginBottom: '20px', alignItems: 'center' }}>
          <Col sm={24}>
            <input
              id='publish'
              type='checkbox'
              className='h-4 w-4 focus:ring-2 focus:ring-blue-500'
              checked={isPublish}
              onChange={() => dispatch(filterBlogReducer.actions.changePublic())}
              disabled={loading}
            />
            <label htmlFor='publish' className='ml-2 text-sm font-medium text-gray-900'>
              Publish
            </label>
          </Col>
        </Row>
        <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
          {loading ? (
            <>
              <Skeleton></Skeleton>
              <Skeleton></Skeleton>
            </>
          ) : (
            postList.map((post) => (
              <PostItem key={post.id} post={post} deletePost={handelDeletePost} editPost={handelEditPost} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default PostList
