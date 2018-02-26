import { authHeader } from '../_helpers';

export const questionService = {
	addQuestion,
	deleteQuestion,
	getQuestion,
	getUserQuestions,
	getAll
};

function addQuestion(question) {

	let user = JSON.parse(localStorage.getItem('user')).user;

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name: question,
			owner: user.id
		})
	};

	const url = `/questions/`;

	return fetch(url, requestOptions).then(handleResponse);
}

function deleteQuestion(id) {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader()
	};
	const url = `/questions/${id}`;

	return fetch(url, requestOptions).then(handleResponse);
}

function getQuestion(id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};
	const url = `/questions/${id}`;

	return fetch(url, requestOptions).then(handleResponse);
}


function getUserQuestions(user_id) {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};
	const url = `/questions/user/${user_id}/`;

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

	// On delete, server returns 204 and No Content statusText
	if(response.status == 204 && response.statusText == 'No Content'){
		return {};
	}

	return response.json();
}
