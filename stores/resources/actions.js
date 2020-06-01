import {
  RESOURCES_LOAD_REQUEST,
  RESOURCES_FILTER_REQUEST,
  RESOURCES_SEARCH_REQUEST,
  RESOURCES_TYPES_REQUEST,
} from '../types'

export const reqResourcesAction = (payload ) => ({
  type: RESOURCES_LOAD_REQUEST,
  payload: payload
})


export const reqFilterResourcesAction = (payload ) => (
{
  type: RESOURCES_FILTER_REQUEST,
  payload: payload
})

export const reqSearchResourcesAction = (payload ) => (
{
  type: RESOURCES_SEARCH_REQUEST,
  payload: payload
})

export const reqResourcesTypesAction = (payload ) => (
{
  type: RESOURCES_TYPES_REQUEST,
  payload: payload
})

export default {
  reqResourcesAction,
  reqFilterResourcesAction,
  reqSearchResourcesAction,
  reqResourcesTypesAction
}
