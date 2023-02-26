import { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'
import unidecode from 'unidecode'

export const blogListSelector = (state: RootState) => state.blog.postList
export const blogSelectedEditor = (state: RootState) => state.blog.editingPost
export const blogLoading = (state: RootState) => state.blog.loading
export const isPublishSelected = (state: RootState) => state.blogFilters.isPublic
export const searchBlogText = (state: RootState) => state.blogFilters.text
export const searchTag = (state: RootState) => state.blogFilters.tag
export const blogRemainSelector = createSelector(
  blogListSelector,
  isPublishSelected,
  searchBlogText,
  searchTag,
  (blogList, isPublish, text, tag) => {
    return blogList.filter(
      (blog) => {
        const propertyValueTag: string = blog[tag].toString()
        return (
          (isPublish ? blog.published : !blog.published) &&
          unidecode(propertyValueTag).toLocaleLowerCase().includes(unidecode(text).toLowerCase())
        )
      }
      // unidecode(blog.title).toLowerCase().includes(unidecode(title).toLowerCase()) &&
      // unidecode(blog.description).toLowerCase().includes(unidecode(description).toLowerCase())
    )
  }
)
