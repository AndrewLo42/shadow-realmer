import React from 'react';
import ShadowRealmerIcon from './shadow-realmer-icon';

export default class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      hasUserUnsuccessfullyLoggedIn: false
    };
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserNameChange(event) {
    this.setState({ userName: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const requestBody = JSON.stringify({
      userName: this.state.userName,
      password: this.state.password
    });
    const requestParams = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody
    };
    fetch('/api/usersLogin', requestParams)
      .then(data => {
        if (data.ok) {
          return data.json();
        }
        this.setState({
          userName: '',
          password: '',
          hasUserUnsuccessfullyLoggedIn: true
        });
        throw new Error('Log in unsuccessful.');
      })
      .then(userData => {
        this.props.logInUser(userData);
        this.props.history.goBack();
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="log-in-container">
        <div className="log-in-header">
          <span className="back-button" onClick={() => this.props.history.goBack()}>
            <i className="fa fa-angle-double-left"></i>
          </span>
        </div>
        <ShadowRealmerIcon />
        <div className="welcome-banner">
          Welcome to Shadow Realmer
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="log-in-form-children-container">
            <input
              type="text"
              className={`long-input input ${this.state.hasUserUnsuccessfullyLoggedIn && 'log-in-error-border'}`}
              placeholder="Username"
              onChange={this.handleUserNameChange}
              value={this.state.userName} />
            <input
              type="password"
              className={`long-input input ${this.state.hasUserUnsuccessfullyLoggedIn && 'log-in-error-border'}`}
              placeholder="Password"
              onChange={this.handlePasswordChange}
              value={this.state.password} />
            <div className="log-in-form-button-container">
              <button type="submit" className="short-input input confirm">Log In</button>
              <button className="short-input input green" onClick={() => this.props.history.push('/sign-up')}>Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
