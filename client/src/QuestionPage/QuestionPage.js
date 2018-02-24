import React from 'react';
import { connect } from 'react-redux';

import { questionActions } from '../_actions';
import { choiceActions } from '../_actions';

import { Button, Input, List } from 'semantic-ui-react'


class QuestionPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			newChoice: '',
			voted: false
		};

		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleNewChoice = this.handleNewChoice.bind(this);
		this.handleVoting = this.handleVoting.bind(this);
	}

	componentDidMount() {
		const { match, dispatch } = this.props;
		
		dispatch(questionActions.getQuestion(match.params.id));
		dispatch(choiceActions.getChoices(match.params.id));
	}

	handleOnChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value })
	}

	handleNewChoice(e) {
		const { match, dispatch } = this.props;
		const { newChoice } = this.state;

		dispatch(choiceActions.addNewChoice(match.params.id, newChoice));
		this.setState({ 'newChoice': '' })
	}

	handleVoting(e) {
		e.preventDefault();

		const { dispatch } = this.props;
		const { id, value } = e.target; // retrieve id and votes
		const newCount = parseInt(value) + 1;

		this.setState({ voted: true });
		dispatch(choiceActions.voteForChoice(id, newCount));
	}

	render() {
		const { match, question, choices } = this.props;
		const { newChoice, voted } = this.state;

		return (
			<div>
				{question.item && <h1>{question.item.name}</h1>}
				<h2>Choices are:</h2>

				{choices.items &&
					<List>
						{choices.items.map((choice, index) =>
							<List.Item key={choice.choice_text}>
								{choice.choice_text} | Votes: {choice.votes}

								{!voted &&
									<Button
										color='teal'
										size='small'
										content='vote'
										id={choice.id}
										value={choice.votes}
										onClick={this.handleVoting}
									/>}
							</List.Item>
						)}
						<List.Item>
							<Input
								name='newChoice'
								placeholder='New Choice'
								value={newChoice}
								onChange={this.handleOnChange}
							/>
							<Button
								color='teal'
								size='small'
								content='Add'
								onClick={this.handleNewChoice}
							/>
						</List.Item>
					</List>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { question, choices } = state;
	return {
		question,
		choices,
	}
}

const connectedQuestionPage = connect(mapStateToProps)(QuestionPage);
export { connectedQuestionPage as QuestionPage };
