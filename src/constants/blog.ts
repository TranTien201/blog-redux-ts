import { Post } from 'pages/types/blog.type'
import uuid from 'react-uuid'

export const postDefault: Post = {
  id: uuid(),
  title: '',
  description: '',
  publishDate: '',
  featuredImage: '',
  published: false
}
