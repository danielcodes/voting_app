import { questionConstants } from '../_constants';
import { questionService } from '../_services';
import { history } from '../_helpers';

export const questionActions = {
	getAll
};


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
