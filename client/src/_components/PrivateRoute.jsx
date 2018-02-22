import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// basically says, if logged in go to homepage, otherwise go to /home
export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		localStorage.getItem('user')
			? <Component {...props} />
			: <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
	)} />
)
