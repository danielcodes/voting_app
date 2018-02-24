import { choiceConstants } from '../_constants';

export function choices(state = {}, action) {
  switch (action.type) {
    case choiceConstants.CHOICE_REQUEST:
      return {
        loading: true
      };
    case choiceConstants.CHOICE_SUCCESS:
      return {
        items: action.choice
      };
    case choiceConstants.CHOICE_FAILURE:
      return {
        error: action.error
      };
		case choiceConstants.VOTE_SUCCESS:
			let updated = []
			for(let i=0; i<state.items.length; i++){
				if(state.items[i].id == action.choice.id){
					updated.push(action.choice);
				}
				else {
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
