import { SearchState } from 'pages/types/blog.type'
import { createSlice } from '@reduxjs/toolkit'

const initialState: SearchState = {
  searchTitle: '',
  searchDescription: '',
  isPublic: true
}

const filterBlogReducer = createSlice({
  name: 'filterBlog',
  initialState,
  reducers: {
    searchTitle: (state, action) => {
      state.searchDescription = ''
      state.searchTitle = action.payload
    },
    searchDescription: (state, action) => {
      state.searchTitle = ''
      state.searchDescription = action.payload
    },
    changePublic: (state) => {
      state.isPublic = !state.isPublic
    }
  }
})

export default filterBlogReducer
