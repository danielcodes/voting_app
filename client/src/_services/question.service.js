import { authHeader } from '../_helpers';

export const questionService = {
	getQuestion,
	getAll
};

function getQuestion(id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};
	const url = `/questions/${id}`;

	return fetch(url, requestOptions).then(handleResponse);
}

function getAll() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch('/questions/', requestOptions).then(handleResponse);
}

function handleResponse(response) {
	if (!response.ok) { 
		return Promise.reject(response.statusText);
	}

	return response.json();
}
