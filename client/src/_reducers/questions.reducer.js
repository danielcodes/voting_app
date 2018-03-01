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
    case questionConstants.DEL_QUES_SUCCESS:
			let updated = [];
			let ques_id = parseInt(action.question, 10);
			for(let i=0; i<state.items.length; i++){
				if(state.items[i].id !== ques_id){
					updated.push(state.items[i]);
				}
			}
      return {
        items: updated
      };
    default:
      return state
  }
}
