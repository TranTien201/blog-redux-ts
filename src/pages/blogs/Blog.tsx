import CreatePost from './components/CreatePost'
import PostList from './components/PostList'

const Blog = () => {
  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-center font-mono text-xl font-semibold'>My Blog</h1>
      <CreatePost />
      <PostList />
    </div>
  )
}

export default Blog
