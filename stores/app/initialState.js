import { fromJS } from 'immutable'

/**
 * App initial values for the redux state.
 */
export default fromJS({
  isLoading: false,
  isLoaded: false,
  error: null,
  errorSource: null,
});
