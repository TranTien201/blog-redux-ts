import { SearchState } from 'pages/types/blog.type'
import { createSlice } from '@reduxjs/toolkit'

const initialState: SearchState = {
  text: '',
  tag: 'title',
  isPublic: true
}

const filterBlogReducer = createSlice({
  name: 'filterBlog',
  initialState,
  reducers: {
    searchText: (state, action) => {
      state.text = action.payload
    },
    changePublic: (state) => {
      state.isPublic = !state.isPublic
    },
    changeTag: (state, action) => {
      state.tag = action.payload
    }
  }
})

export default filterBlogReducer
