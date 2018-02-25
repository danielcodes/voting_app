import { questionConstants } from '../_constants';
import { questionService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const questionActions = {
	addQuestion,
	getQuestion,
	getAll
};

function getQuestion(id) {
	return dispatch => {
		dispatch(request({ id }));

		questionService.getQuestion(id)
			.then(
				question => dispatch(success(question)),
				error => dispatch(failure(error))
			);
	}

	function request(question) { return { type: questionConstants.GET_REQUEST, question } }
	function success(question) { return { type: questionConstants.GET_SUCCESS, question } }
	function failure(error) { return { type: questionConstants.GET_FAILURE, error } }
}

function getAll() {
	return dispatch => {
		dispatch(request());

		questionService.getAll()
			.then(
				questions => dispatch(success(questions)),
				error => dispatch(failure(error))
			);
	};

	function request() { return { type: questionConstants.GETALL_REQUEST } }
	function success(questions) { return { type: questionConstants.GETALL_SUCCESS, questions } }
	function failure(error) { return { type: questionConstants.GETALL_FAILURE, error } }
}

function addQuestion(question) {
	return dispatch => {
		dispatch(request({ question }));

		questionService.addQuestion(question)
			.then(
				question => {
					dispatch(success(question))
					history.push(`/questions/${question.id}`);
					dispatch(alertActions.success('Question created! Add some choices!'));
				},
				error => {
					dispatch(failure(error))
					//dispatch(alertActions.error(error));
				}
			);
	}

	function request(question) { return { type: questionConstants.NEW_QUES_REQUEST, question } }
	function success(question) { return { type: questionConstants.NEW_QUES_SUCCESS, question } }
	function failure(error) { return { type: questionConstants.NEW_QUES_FAILURE, error } }
}
