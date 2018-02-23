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
    default:
      return state
  }
}
