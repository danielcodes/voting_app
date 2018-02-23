import React from 'react';
import { connect } from 'react-redux';

import { questionActions } from '../_actions';
import { choiceActions } from '../_actions';

import { List } from 'semantic-ui-react'


class QuestionPage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			voted: false
		};
	}

	componentDidMount() {
		const { match } = this.props;
		// give the id of the question
		// grab the its own data, questions/<id>
		// and need something for choices of the questions
		// questions/:id/choices? so create my own route
		// yup, gotta touch the backend
		
		this.props.dispatch(questionActions.getQuestion(match.params.id));
		this.props.dispatch(choiceActions.getChoices(match.params.id));
	}


	render() {
		const { match, question, choices } = this.props;

		return (
			<div>
				{question.item && <h1>{question.item.name}</h1>}
				<h2>Choices are:</h2>

				{choices.items &&
					<List>
						{choices.items.map((choice, index) =>
							<List.Item key={choice.choice_text}>
								{choice.choice_text} | Votes: {choice.votes}
							</List.Item>
						)}
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
