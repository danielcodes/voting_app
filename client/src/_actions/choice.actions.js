import { choiceConstants } from '../_constants';
import { choiceService } from '../_services';
import { alertActions } from './';

export const choiceActions = {
	voteForChoice,
	getChoices,
};

function getChoices(id) {
	return dispatch => {
		dispatch(request({ id }));

		choiceService.getChoices(id)
			.then(
				choice => dispatch(success(choice)),
				error => dispatch(failure(error))
			);
	}

	function request(choice) { return { type: choiceConstants.CHOICE_REQUEST, choice } }
	function success(choice) { return { type: choiceConstants.CHOICE_SUCCESS, choice } }
	function failure(error) { return { type: choiceConstants.CHOICE_FAILURE, error } }
}

function voteForChoice(id, count) {
	return dispatch => {
		dispatch(request({ id }));

		choiceService.voteForChoice(id, count)
			.then(
				choice => {
					dispatch(success(choice)),
					dispatch(alertActions.success('Thanks for voting!'));
				},
				error => {
					dispatch(failure(error)),
					dispatch(alertActions.error(error));
				}
			);
	}

	function request(choice) { return { type: choiceConstants.VOTE_REQUEST, choice } }
	function success(choice) { return { type: choiceConstants.VOTE_SUCCESS, choice } }
	function failure(error) { return { type: choiceConstants.VOTE_FAILURE, error } }
}
