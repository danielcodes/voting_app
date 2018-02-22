import { combineReducers } from 'redux';

import { signup } from './signup.reducer';
import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { questions } from './questions.reducer';

const rootReducer = combineReducers({
	signup,
  authentication,
  users,
  alert,
	questions
});

export default rootReducer;
