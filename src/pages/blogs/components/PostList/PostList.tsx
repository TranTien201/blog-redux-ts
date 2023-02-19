import PostItem from '../PostItem/PostItem'
import { useSelector } from 'react-redux'
import { blogListSelector, blogLoading } from 'redux/selectors/blog.selector'
import blogReducer, { deletePost, getPostList } from 'redux/reducers/blog.reducer'
import { useEffect } from 'react'
import { useAppDispatch } from 'redux/store'
import Skeleton from '../Skeleton'
const PostList = () => {
  const postList = useSelector(blogListSelector)
  const dispatch = useAppDispatch()
  const loading = useSelector(blogLoading)
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

  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Tran Tien's Blog</h2>
          <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>
            Đừng bao giờ từ bỏ. Hôm nay khó khăn, ngày mai sẽ trở nên tồi tệ. Nhưng ngày mốt sẽ có nắng
          </p>
        </div>
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
