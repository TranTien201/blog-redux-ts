import { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'
import unidecode from 'unidecode'

export const blogListSelector = (state: RootState) => state.blog.postList
export const blogSelectedEditor = (state: RootState) => state.blog.editingPost
export const blogLoading = (state: RootState) => state.blog.loading
export const isPublishSelected = (state: RootState) => state.blogFilters.isPublic
export const searchBlogTitle = (state: RootState) => state.blogFilters.searchTitle
export const searchBlogDescription = (state: RootState) => state.blogFilters.searchDescription
export const blogRemainSelector = createSelector(
  blogListSelector,
  isPublishSelected,
  searchBlogTitle,
  searchBlogDescription,
  (blogList, isPublish, title, description) => {
    return blogList.filter((blog) => {
      return isPublish
        ? unidecode(blog.title).toLowerCase().includes(unidecode(title).toLowerCase()) &&
            unidecode(blog.description).toLowerCase().includes(unidecode(description).toLowerCase()) &&
            blog.published
        : unidecode(blog.title).toLowerCase().includes(unidecode(title).toLowerCase()) &&
            unidecode(blog.description).toLowerCase().includes(unidecode(description).toLowerCase()) &&
            !blog.published
    })
  }
)
