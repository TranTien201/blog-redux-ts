import { useDispatch } from 'react-redux'
import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blog/blog.reducer'
import filterBlogReducer from './reducers/blog/filter.reducer'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk, { ThunkDispatch } from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['blog'] // only persist the state of the 'blog' reducer
}

const rootReducer = combineReducers({
  blog: blogReducer.reducer,
  blogFilters: filterBlogReducer.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

const persistor = persistStore(store)
type AppState = ReturnType<typeof rootReducer>
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>

export { store, persistor }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<TypedDispatch<AppState>>()
