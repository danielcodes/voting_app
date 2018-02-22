import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';


class HomePage extends React.Component {
	componentDidMount() {
		this.props.dispatch(userActions.getAll());
	}

	handleDeleteUser(id) {
		return (e) => this.props.dispatch(userActions.delete(id));
	}

	render() {
		const { user, users } = this.props;
		return (
			<div>
				<h1>Hi {user.username}!</h1>

				<h3>Users from secure api end point:</h3>
				{users.loading && <em>Loading users...</em>}
				{users.error && <span className="text-danger">ERROR: {users.error}</span>}
				{users.items &&
					<ul>
						{users.items.map((user, index) =>
							<li key={user.username}> {user.username} </li>
						)}
					</ul>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { users, authentication } = state;
	const { user } = authentication;
	return {
		user,
		users
	};
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
