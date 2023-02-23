export interface Post {
  id: string
  title: string
  description: string
  publishDate: string
  featuredImage: string
  published: boolean
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
  searchTitle: string
  searchDescription: string
  isPublic: boolean
}
