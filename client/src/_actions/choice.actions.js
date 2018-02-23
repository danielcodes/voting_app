import { choiceConstants } from '../_constants';
import { choiceService } from '../_services';

export const choiceActions = {
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
