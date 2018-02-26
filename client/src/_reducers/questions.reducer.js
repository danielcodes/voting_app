import { questionConstants } from '../_constants';

export function questions(state = {}, action) {
  switch (action.type) {
    case questionConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case questionConstants.GETALL_SUCCESS:
      return {
        items: action.questions
      };
    case questionConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
		case questionConstants.GET_USER_QUES_REQUEST:
			return {
				loading: true
			};
		case questionConstants.GET_USER_QUES_SUCCESS:
			return {
				items: action.questions
			};
    default:
      return state
  }
}
