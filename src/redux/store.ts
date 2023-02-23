import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import blogReducer from 'redux/reducers/blog/blog.reducer'
import filterBlogReducer from './reducers/blog/filter.reducer'

export const store = configureStore({
  reducer: {
    blog: blogReducer.reducer,
    blogFilters: filterBlogReducer.reducer
  }
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
