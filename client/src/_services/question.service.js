import { authHeader } from '../_helpers';

export const questionService = {
	getAll
};


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
