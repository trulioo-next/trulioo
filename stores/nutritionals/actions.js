import {
  NUTRITIONAL_LOAD_REQUEST,
} from '../types'

export const reqNutritionalsAction = (payload ) => ({
  type: NUTRITIONAL_LOAD_REQUEST,
  payload: payload
})

export default {
  reqNutritionalsAction
}
