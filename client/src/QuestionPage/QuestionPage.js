import React from 'react';


class QuestionPage extends React.Component {
	// retrieve it's own data
	// another hit to retrieve the choices associated with this question
	// need to think about the UI for voting mechanism

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
		
		//this.props.dispatch(questionActions.getAll());
	}


	render() {
		const { match } = this.props;
		return (
			<div>
				<h3>Question ID: {match.params.id}</h3>
			</div>
		);
	}
}

export { QuestionPage };
