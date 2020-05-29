/*
 * Apppliction reducer
 * We use immutableJS to ensure immutability on the application state level.
 */

import { INITIAL_STATE } from './initialState';

import { RESOURCES__LOADED, RESOURCES__ERROR } from '../types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESOURCES__LOADED:
      return {
        ...state,
        postList: action.payload.postList,
        topics: action.payload.topics,
        types: action.payload.types,
        featured: action.payload.featured,
      };

    case RESOURCES__ERROR:
      return {
        ...state,
        error: action.payload,
        errorSource: RESOURCES_LOAD_ERROR,
      };

    default:
      return state;
  }
};
