import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { signedUp: true } : {};

export function signup(state = initialState, action) {
  switch (action.type) {
    case userConstants.SIGNUP_REQUEST:
      return {
        signingIn: true,
        user: action.user
      };
    case userConstants.SIGNUP_SUCCESS:
      return {
        signedUp: true,
        user: action.user
      };
    case userConstants.SIGNUP_FAILURE:
      return {};
    default:
      return state
  }
}
