import React from 'react';
import { connect } from 'react-redux';

import { userActions, questionActions } from '../_actions';
import { history } from '../_helpers';

import { Header, Grid, Segment } from 'semantic-ui-react';

import './HomePage.css';


class HomePage extends React.Component {
	componentDidMount() {
		this.props.dispatch(questionActions.getAll());
	}

	handleDeleteUser(id) {
		return (e) => this.props.dispatch(userActions.delete(id));
	}

	handleQuestionClick(e) {
		let ques_id = e.target.getAttribute('value');
		history.push(`questions/${ques_id}`);
	}

	render() {
		// have user and users
		const { questions } = this.props;

		return (
			<Grid stackable>
				<Grid.Row centered colums={4}>
					<Header as='h1' color='teal'>
						Welcome to Pollster
					</Header>
				</Grid.Row>

				<Grid.Row centered columns={2}>
					<Grid.Column>
						{questions.items &&
							<Segment.Group>
								{questions.items.map((question, index) =>
									<Segment
										className='poll-item'
										color='teal'
										key={question.id}
										value={question.id}
										onClick={this.handleQuestionClick}
										>
										{question.name}
									</Segment>
								)}
							</Segment.Group>
						}
					</Grid.Column>
				</Grid.Row>
			</Grid>
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
