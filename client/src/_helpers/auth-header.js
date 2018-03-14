export function authHeader() {
	// return authorization header with jwt token
	let user = JSON.parse(localStorage.getItem('user'));

	if (user && user.token) {
		return {
			'Authorization': 'JWT ' + user.token,
			'Content-Type': 'application/json'
		};
	} else {
		return {
			'Content-Type': 'application/json'
		};
	}
}
