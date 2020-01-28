import React from 'react';
import ShadowRealmerIcon from './shadow-realmer-icon';

export default class LogInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
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
      .then(data => data.json())
      .then(userData => {
        this.props.logInUser(userData);
        this.props.history.push('/');
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="log-in-container">
        <ShadowRealmerIcon />
        <div className="welcome-banner">
          Welcome to Shadow Realmer
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="log-in-form-children-container">
            <input type="text" className="long-input input" placeholder="Username" onChange={this.handleUserNameChange} value={this.state.userName} />
            <input type="password" className="long-input input" placeholder="Password" onChange={this.handlePasswordChange} value={this.state.password} />
            <button type="submit" className="short-input input confirm">Log In</button>
          </div>
        </form>
      </div>
    );
  }
}
