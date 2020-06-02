/*
* Apppliction reducer
* We use immutableJS to ensure immutability on the application state level.
*/

import { INITIAL_STATE } from './initialState'

import {
  ARTICLES_LOADED,
  ARTICLES_ERROR,
  ARTICLES_FILTER_LOADED,
  ARTICLES_SEARCH_LOADED,
  ARTICLES_TYPES_LOADED
} from '../types'


export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case ARTICLES_LOADED:
      return { ...state,
        postList: action.payload.postList,
        featured:action.payload.featured,
        topics: action.payload.topics,
        types: action.payload.types,
        postDataById: action.payload.postDataById,
        marketoBlog: action.payload.marketoBlog,
        popularArticles: action.payload.popularArticles,
      }

    case ARTICLES_FILTER_LOADED:
        return { ...state,
          postList: action.payload.postList,
          featured:action.payload.featured,
          topics: action.payload.topics,
          types: action.payload.types,
          marketoBlog: action.payload.marketoBlog,
          popularArticles: action.payload.popularArticles,
        }

    case ARTICLES_SEARCH_LOADED:
        return { ...state,
          postList: action.payload.postList,
        }

    case ARTICLES_TYPES_LOADED:
        return { ...state,
          types: action.payload.postList,
        }

    case ARTICLES_ERROR:
      return { ...state,
        error: action.payload,
        errorSource: ARTICLES_ERROR
      }

    default:
      return state
  }
}
