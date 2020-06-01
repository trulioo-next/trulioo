/*
 * Apppliction reducer
 * We use immutableJS to ensure immutability on the application state level.
 */

import { INITIAL_STATE } from './initialState';

import {
  RESOURCES_LOADED,
  RESOURCES_ERROR,
  RESOURCES_FILTER_LOADED,
  RESOURCES_SEARCH_LOADED,
  RESOURCES_TYPES_LOADED
} from '../types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESOURCES_LOADED:
      return {
        ...state,
        postList: action.payload.postList,
        topics: action.payload.topics,
        types: action.payload.types,
        featured: action.payload.featured,
      };

      case RESOURCES_FILTER_LOADED:
          return { ...state,
            postList: action.payload.postList,
            featured:action.payload.featured,
            topics: action.payload.topics,
            types: action.payload.types,
          }

      case RESOURCES_SEARCH_LOADED:
          return { ...state,
            postList: action.payload.postList,
          }

      case RESOURCES_TYPES_LOADED:
          return { ...state,
            types: action.payload.postList,
          }

    case RESOURCES_ERROR:
      return {
        ...state,
        error: action.payload,
        errorSource: RESOURCES_LOAD_ERROR,
      };

    default:
      return state;
  }
};
