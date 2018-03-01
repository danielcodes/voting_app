import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { questionActions } from '../_actions';
import { history } from '../_helpers';
import './MyPolls.css';

import { Button, Grid, Header, Segment } from 'semantic-ui-react'


class MyPollsPage extends React.Component {
	constructor(props) {
		super(props);

		this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);
		this.handleQuestionClick = this.handleQuestionClick.bind(this);
	}

	componentDidMount() {
		let user = JSON.parse(localStorage.getItem('user')).user;
		this.props.dispatch(questionActions.getUserQuestions(user.id));
	}

	handleQuestionClick(e) {
		let ques_id = e.target.getAttribute('value');
		history.push(`questions/${ques_id}`);
	}

	handleDeleteQuestion(e) {
		let ques_id = e.target.value;
		this.props.dispatch(questionActions.deleteQuestion(ques_id));
	}

	render() {
		const { questions }	= this.props;

		return (
			<Grid stackable>
				<Grid.Row centered colums={4}>
					<Header as='h1' color='teal'>
						My Polls
					</Header>
				</Grid.Row>

				<Grid.Row centered columns={2}>
					{questions.items &&
						<Grid.Column>
							<Segment.Group>
								{questions.items.map((question, index) =>
									<Segment clearing color='teal' key={question.id}>
										<Link
											className='plain-link'
											to={`/questions/${question.id}`}>
											{question.name}
										</Link>

										<Button
											color='red'
											size='mini'
											content='Delete'
											floated='right'
											value={question.id}
											onClick={this.handleDeleteQuestion}
										/>
									</Segment>
								)}
							</Segment.Group>
						</Grid.Column>
					}
				</Grid.Row>
			</Grid>
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
