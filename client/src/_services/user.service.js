import { authHeader } from '../_helpers';

export const userService = {
	login,
	logout,
	signUp,
	getAll
};

function login(username, password) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password })
	};

	return fetch('/auth/jwt/create/', requestOptions)
		.then(response => {
			if (!response.ok) { 
				return Promise.reject(response.statusText);
			}

			return response.json();
		})
		.then(user => {
			// login successful if there's a jwt token in the response
			if (user && user.token) {
				// store user details and jwt token in local storage to keep user logged in between page refreshes
				localStorage.setItem('user', JSON.stringify(user));
			}

			return user;
		});
}

function signUp(username, email, password) {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, email, password })
	};

	return fetch('/auth/users/create/', requestOptions)
		.then(response => {
			if (!response.ok) { 
				return Promise.reject(response.statusText);
			}

			return response.json();
		})
}

function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem('user');
}

function getAll() {
	const requestOptions = {
		method: 'GET',
		headers: authHeader()
	};

	return fetch('/users/', requestOptions).then(handleResponse);
}

function handleResponse(response) {
	if (!response.ok) { 
		return Promise.reject(response.statusText);
	}

	return response.json();
}
