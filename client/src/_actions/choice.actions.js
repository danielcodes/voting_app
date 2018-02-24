import { choiceConstants } from '../_constants';
import { choiceService } from '../_services';
import { alertActions } from './';

export const choiceActions = {
	addNewChoice,
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

function addNewChoice(ques_id, choice_text){
	return dispatch => {
		dispatch(request({ ques_id }));

		choiceService.addNewChoice(ques_id, choice_text)
			.then(
				choice => {
					dispatch(success(choice))
					//dispatch(alertActions.success('Thanks for voting!'));
				},
				error => {
					dispatch(failure(error))
					//dispatch(alertActions.error(error));
				}
			);
	}

	function request(choice) { return { type: choiceConstants.NEW_CHOICE_REQUEST, choice } }
	function success(choice) { return { type: choiceConstants.NEW_CHOICE_SUCCESS, choice } }
	function failure(error) { return { type: choiceConstants.NEW_CHOICE_FAILURE, error } }

}
