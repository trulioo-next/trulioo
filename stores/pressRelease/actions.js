import {
  PRESS_LOAD_REQUEST,
  ARTICLES_FILTER_REQUEST,
  ARTICLES_SEARCH_REQUEST,
  ARTICLES_TYPES_REQUEST,
} from '../types'

export const reqPressReleaseAction = (payload ) => ({
  type: PRESS_LOAD_REQUEST,
  payload: payload
})

export const reqFilterPressAction = (payload ) => (
{
  type: ARTICLES_FILTER_REQUEST,
  payload: payload
})

export const reqSearchPressAction = (payload ) => (
{
  type: ARTICLES_SEARCH_REQUEST,
  payload: payload
})

export const reqPressTypesAction = (payload ) => (
{
  type: ARTICLES_TYPES_REQUEST,
  payload: payload
})

export default {
  reqPressReleaseAction,
  reqFilterPressAction,
  reqSearchPressAction,
  reqPressTypesAction
}
