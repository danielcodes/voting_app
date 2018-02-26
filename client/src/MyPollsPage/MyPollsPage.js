import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { questionActions } from '../_actions';

import { List } from 'semantic-ui-react'


class MyPollsPage extends React.Component {
	componentDidMount() {
		let user = JSON.parse(localStorage.getItem('user')).user;
		this.props.dispatch(questionActions.getUserQuestions(user.id));
	}

	render() {
		const { questions }	= this.props;

		return (
			<div>
				<h2>My polls</h2>
				{questions.items &&
					<List>
						{questions.items.map((question, index) =>
							<List.Item as={Link} to={`questions/${question.id}`} key={question.name}>
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
	const { questions } = state;
	return {
		questions
	};
}

const connectedMyPollsPage = connect(mapStateToProps)(MyPollsPage);
export { connectedMyPollsPage as MyPollsPage };
