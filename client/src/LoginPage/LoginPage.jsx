import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { userActions } from '../_actions';


class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		// reset login status
		this.props.dispatch(userActions.logout());

		this.state = {
			username: '',
			password: '',
			submitted: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({ submitted: true });
		const { username, password } = this.state;
		const { dispatch } = this.props;
		if (username && password) {
			dispatch(userActions.login(username, password));
		}
	}

	render() {
		const { loggingIn } = this.props;
		const { username, password, submitted } = this.state;

		return (
			<Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as='h2' color='teal' textAlign='center'>
						Log-in to your account
					</Header>
					<Form size='large' onSubmit={this.handleSubmit}>
						<Segment stacked>
							<Form.Input fluid
								name='username'
								icon='user'
								iconPosition='left'
								placeholder='Username'
								value={username}
								error={submitted && !username}
								onChange={this.handleChange}
							/>
							<Form.Input fluid
								name='password'
								icon='lock'
								iconPosition='left'
								placeholder='Password'
								type='password'
								value={password}
								error={submitted && !password}
								onChange={this.handleChange}
							/>
							<Button
								fluid
								type='submit'
								color='teal'
								size='large'
								content='Login'
								loading={loggingIn}
							/>
						</Segment>
					</Form>
					<Message>New user? <Link to='/signup'>Sign Up</Link></Message>
				</Grid.Column>
			</Grid>
		);
	}
}

function mapStateToProps(state) {
	const { loggingIn } = state.authentication;
	return {
		loggingIn
	};
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
