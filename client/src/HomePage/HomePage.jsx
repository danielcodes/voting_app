import React from 'react';
import { connect } from 'react-redux';

import { userActions, questionActions } from '../_actions';


class HomePage extends React.Component {
	componentDidMount() {
		this.props.dispatch(questionActions.getAll());
	}

	handleDeleteUser(id) {
		return (e) => this.props.dispatch(userActions.delete(id));
	}

	render() {
		const { user, users, questions } = this.props;
		return (
			<div>
				<h2>These are the current polls</h2>
				{questions.items &&
					<ul>
						{questions.items.map((question, index) =>
							<li key={question.name}> {question.name} </li>
						)}
					</ul>
				}

			</div>
		);
	}
}

function mapStateToProps(state) {
	const { authentication, questions } = state;
	const { user } = authentication;
	return {
		user,
		questions
	};
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
