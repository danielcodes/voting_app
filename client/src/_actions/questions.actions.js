import { questionConstants } from '../_constants';
import { questionService } from '../_services';
import { history } from '../_helpers';

export const questionActions = {
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
