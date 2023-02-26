export interface Post {
  id: string
  title: string
  description: string
  publishDate: string
  featuredImage: string
  published: boolean
  [key: string]: number | string | boolean
}
export interface PostState {
  postList: Post[]
  editingPost: Post | null
  loading: boolean
  currentRequestId: undefined | string
  search: string
  publish: boolean
}

export interface SearchState {
  text: string
  tag: string
  isPublic: boolean
}
