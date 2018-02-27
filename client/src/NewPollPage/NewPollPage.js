import React from 'react';
import { connect } from 'react-redux';

import { questionActions } from '../_actions';

import { Button, Form, Grid, Header, List, TextArea } from 'semantic-ui-react'


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
			<Grid>
				<Grid.Row centered colums={4}>
					<Header as='h1' color='teal'>
						Create a new poll
					</Header>
				</Grid.Row>

				<Grid.Row centered columns={3}>
					<Grid.Column>
						<Form>
							<TextArea
								autoHeight
								name='newPoll'
								placeholder='ie. Favorite pizza slice'
								value={newPoll}
								onChange={this.handleOnChange}
							/>
							<Button
								fluid
								color='teal'
								size='medium'
								content='Create poll'
								style={{ marginTop: '0.5em' }}
								onClick={this.handleNewPoll}
							/>
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

const connectedNewPollPage = connect()(NewPollPage);
export { connectedNewPollPage as NewPollPage };
