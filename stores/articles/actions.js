import {
  ARTICLES_LOAD_REQUEST,
  ARTICLES_FILTER_REQUEST,
  ARTICLES_SEARCH_REQUEST,
  ARTICLES_TYPES_REQUEST,
} from '../types'

export const reqArticlesAction = (payload ) => (
{
  type: ARTICLES_LOAD_REQUEST,
  payload: payload
})

export const reqFilterArticlesAction = (payload ) => (
{
  type: ARTICLES_FILTER_REQUEST,
  payload: payload
})

export const reqSearchArticlesAction = (payload ) => (
{
  type: ARTICLES_SEARCH_REQUEST,
  payload: payload
})

export const reqArticlesTypesAction = (payload ) => (
{
  type: ARTICLES_TYPES_REQUEST,
  payload: payload
})


export default {
  reqArticlesAction,
  reqFilterArticlesAction,
  reqSearchArticlesAction,
  reqArticlesTypesAction
}
