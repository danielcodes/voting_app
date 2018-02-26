import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { questionActions } from '../_actions';

import { Button, List } from 'semantic-ui-react'


class MyPollsPage extends React.Component {
	constructor(props) {
		super(props);

		this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
	}

	componentDidMount() {
		let user = JSON.parse(localStorage.getItem('user')).user;
		this.props.dispatch(questionActions.getUserQuestions(user.id));
	}

	handleDeleteQuestion(e) {
		// action to delete a question
		// just need the id of the question
		let ques_id = e.target.value;
		this.props.dispatch(questionActions.deleteQuestion(ques_id));
	}

	render() {
		const { questions }	= this.props;

		return (
			<div>
				<h2>My polls</h2>
				{questions.items &&
					<List>
						{questions.items.map((question, index) =>
							<List.Item key={question.name}>
								<List.Content as={Link} to={`questions/${question.id}`}> {question.name} </List.Content>
								<Button
									color='red'
									size='mini'
									content='Delete'
									value={question.id}
									onClick={this.handleDeleteQuestion}
								/>
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
