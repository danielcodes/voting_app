import { alertConstants } from '../_constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'green',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'red',
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}
