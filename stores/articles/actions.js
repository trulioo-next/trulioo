import {
  ARTICLES_LOAD_REQUEST,
} from '../types'

export const reqArticlesAction = (payload ) => ({
  type: ARTICLES_LOAD_REQUEST,
  payload: payload
})

export default {
  reqArticlesAction
}
