import { configureStore } from '@reduxjs/toolkit'
import blogReducer from 'redux/reducers/blog.reducer'

export const store = configureStore({
  reducer: {
    blog: blogReducer.reducer
  }
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
