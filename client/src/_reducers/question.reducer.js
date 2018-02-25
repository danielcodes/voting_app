import { questionConstants } from '../_constants';

export function question(state = {}, action) {
  switch (action.type) {
    case questionConstants.GET_REQUEST:
      return {
        loading: true
      };
    case questionConstants.GET_SUCCESS:
      return {
        item: action.question
      };
    case questionConstants.GET_FAILURE:
      return { 
        error: action.error
      };
    case questionConstants.NEW_QUES_SUCCESS:
      return {
        item: action.question
      };
    default:
      return state
  }
}
