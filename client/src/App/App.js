import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { LandingPage } from '../LandingPage';
import { SignUpPage } from '../SignUpPage';
import { AboutPage } from '../AboutPage';
import { QuestionPage } from '../QuestionPage';
import { NewPollPage } from '../NewPollPage';
import { NotFoundPage } from '../NotFoundPage';

import {
  Button,
  Container,
  Menu,
	Message,
  Segment,
} from 'semantic-ui-react'


class App extends Component {
	constructor(props) {
		super(props);

		const { dispatch } = this.props;
		history.listen((location, action) => {
			// clear alert on location change
			dispatch(alertActions.clear());
		});
	}

	render(){
    const { alert } = this.props
    const { fixed } = false

	  return (
			<Router history={history}>
				<Segment inverted textAlign='center' style={{ minHeight: 700, padding: '1em 0em' }} vertical>
					<Menu
						fixed={fixed}
						inverted={!fixed}
						pointing={!fixed}
						secondary={!fixed}
						size='large'
					>
						<Container>
							<Menu.Item as={Link} to="/" active>Home</Menu.Item>
							<Menu.Item as={Link} to="/about" >About</Menu.Item>
							<Menu.Item position='right'>
								{localStorage.getItem('user') ? (
									<div>
										<Button as={Link} to="/new_poll" color="teal">New Poll</Button>
										<Button as={Link} inverted={!fixed} to="/login">Log Out</Button>
									</div>
									) : (
									<div>
										<Button as={Link} inverted={!fixed} to="/login">Log In</Button>
										<Button as={Link} inverted={!fixed} to="/signup" primary={fixed} style={{ marginLeft: '0.5em' }}>Sign Up</Button>
									</div>
									)
								}
							</Menu.Item>
						</Container>
					</Menu>

					{alert.message && <Message compact color={alert.type} content={alert.message}/>}

					<Switch>
						<PrivateRoute exact path="/" component={HomePage} />
						<Route path="/home" component={LandingPage} />
						<Route path="/about" component={AboutPage} />
						<Route path="/login" component={LoginPage} />
						<Route path="/signup" component={SignUpPage} />
						<Route path="/new_poll" component={NewPollPage} />
						<Route path="/questions/:id" component={QuestionPage} />
						<Route component={NotFoundPage} />
					</Switch>
				</Segment>
			</Router>
		)	
	}
}

App.propTypes = {
  children: PropTypes.node,
}

function mapStateToProps(state) {
	const { alert } = state;
	return {
		alert
	};
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
