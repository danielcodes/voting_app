import React from 'react';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs';

import { questionActions } from '../_actions';
import { choiceActions } from '../_actions';

import {
	Button,
	Grid,
	Header,
	Input,
	List,
	Segment
} from 'semantic-ui-react';


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
		this.setState({ [name]: value });
	}

	handleNewChoice(e) {
		const { match, dispatch } = this.props;
		const { newChoice } = this.state;

		dispatch(choiceActions.addNewChoice(match.params.id, newChoice));
		this.setState({ 'newChoice': '' });
	}

	handleVoting(e) {
		e.preventDefault();
		if(this.state.voted){
			return;
		}

		const { dispatch } = this.props;

		// retrieve id and votes
		const { id } = e.target;
		const value = e.target.getAttribute('value');
		const newCount = parseInt(value) + 1;

		this.setState({ voted: true });
		dispatch(choiceActions.voteForChoice(id, newCount));
	}

	render() {
		const { match, question, choices } = this.props;
		const { newChoice, voted } = this.state;

		let data;
		if (choices.items){
			data = choices.items.map((choice) => {
				return {
					value: choice.votes,
					label: choice.choice_text
				};
			});
		}

		return (
			<Grid>
				<Grid.Row centered colums={4}>
					{question.item &&
						<Header as='h1' color='teal'>
							{question.item.name}
						</Header>
					}
				</Grid.Row>

				<Grid.Row centered columns={4}>
					<Grid.Column>
						<Header as='h2' color='teal'>Choices are:</Header>

						{choices.items &&
							<Segment.Group>
								{choices.items.map((choice, index) =>
									<Segment
										disabled={voted ? true : false}
										key={choice.choice_text}
										className={voted
											? 'poll-item-disabled' : 'poll-item'}
										id={choice.id}
										value={choice.votes}
										onClick={this.handleVoting}
										>
										{choice.choice_text}
									</Segment>
								)}

								{localStorage.getItem('user') && !voted &&
									<Segment>
										<Input
											fluid
											name='newChoice'
											placeholder='New Choice'
											action={
												<Button
												color='teal'
												content='Add'
												onClick={this.handleNewChoice}/>
											}
											value={newChoice}
											onChange={this.handleOnChange}
										/>
									</Segment>
								}
							</Segment.Group>
						}
					</Grid.Column>
					<Grid.Column>
						{choices.items && <Doughnut data={data} />}
					</Grid.Column>
				</Grid.Row>
			</Grid>
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
