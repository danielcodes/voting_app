import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, questionActions } from '../_actions';

import { List } from 'semantic-ui-react'


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
					<List>
						{questions.items.map((question, index) =>
							<List.Item as={Link} to={`questions/${index+1}`} key={question.name}>
								{question.name}
							</List.Item>
						)}
					</List>
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
