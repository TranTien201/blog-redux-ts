import { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'

export const blogListSelector = (state: RootState) => state.blog.postList
export const blogSelectedEditor = (state: RootState) => state.blog.editingPost
export const blogLoading = (state: RootState) => state.blog.loading
