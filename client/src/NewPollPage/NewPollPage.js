import React from 'react';
import { connect } from 'react-redux';

import { questionActions } from '../_actions';

import { Button, Input, List } from 'semantic-ui-react'


class NewPollPage extends React.Component {

	// simple page, a header, what page is this
	// create button is on the rightmost side of the header
	// a text box where user enters the question

	constructor(props) {
		super(props);

		this.state = {
			newPoll: '',
		};

		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleNewPoll = this.handleNewPoll.bind(this);
	}

	handleNewPoll(e) {
		const { dispatch } = this.props;
		const { newPoll }	= this.state;

		dispatch(questionActions.addQuestion(newPoll));
	}

	handleOnChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	render() {
		const { newPoll } = this.state;

		return (
			<div>
				<h2>Create a new poll</h2>
					<div>
						<Input
							name='newPoll'
							placeholder='New poll'
							value={newPoll}
							onChange={this.handleOnChange}
						/>
						<Button
							color='teal'
							size='medium'
							content='Create poll'
							onClick={this.handleNewPoll}
						/>
					</div>
			</div>
		);
	}
}

const connectedNewPollPage = connect()(NewPollPage);
export { connectedNewPollPage as NewPollPage };