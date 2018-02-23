import React from 'react';
import { connect } from 'react-redux';

import { questionActions } from '../_actions';


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
	}


	render() {
		const { match } = this.props;
		const { question } = this.props;

		return (
			<div>
				{question.item && <h1>{question.item.name}</h1>}
				<h2>Choices are:</h2>
				<div>
					<ul>
						<li>Choice 1</li>
						<li>Choice 2</li>
					</ul>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { question } = state;
	return {
		question
	}
}
const connectedQuestionPage = connect(mapStateToProps)(QuestionPage);
export { connectedQuestionPage as QuestionPage };
