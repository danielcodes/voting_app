import { combineReducers } from 'redux';

import { signup } from './signup.reducer';
import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { question } from './question.reducer';
import { questions } from './questions.reducer';
import { choices } from './choice.reducer';

const rootReducer = combineReducers({
	signup,
  authentication,
  users,
  alert,
	question,
	questions,
	choices
});

export default rootReducer;
