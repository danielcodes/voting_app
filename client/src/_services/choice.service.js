import { authHeader } from '../_helpers';

export const choiceService = {
	voteForChoice,
	getChoices,
};

function voteForChoice(id, count) {
	const requestOptions = {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ votes: count })
	};

	const url = `/choices/${id}/`;

	return fetch(url, requestOptions).then(handleResponse);
}

function getChoices(id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};
	const url = `/questions/${id}/choices`;

	return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
	if (!response.ok) {
		return Promise.reject(response.statusText);
	}

	return response.json();
}