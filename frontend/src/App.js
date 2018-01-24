import React, { Component } from 'react';
import { connect } from 'react-redux'

import { echo } from './actions/echo'
import { serverMessage } from './reducers'

import { log_out } from './actions/auth'

class App extends Component {
  componentDidMount() {
    this.props.fetchMessage('Hello')
  }

	onLogOut = (event) => {
		event.preventDefault()
		this.props.onLogOut()
	}

	render() {
    return (
      <div>
        <h2>Welcome to React</h2>
        <p>{this.props.message}</p>
				<button onClick={this.onLogOut}>Log out</button>
      </div>
    );
  }
}

export default connect(
  state => ({ message: serverMessage(state) }),
  { 
		fetchMessage: echo,
		onLogOut: log_out
 	}
)(App);
