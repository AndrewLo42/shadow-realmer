/* eslint-disable no-console */
import React from 'react';
import SRContext from './context';

export default class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: '',
      deckArchetype: '',
      email: '',
      password: '',
      confirmedPassword: ''
    };
    this.handleGameIdChange = this.handleGameIdChange.bind(this);
    this.handleDeckArchetypeChange = this.handleDeckArchetypeChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmedPasswordChange = this.handleConfirmedPasswordChange.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeUserInfo = this.changeUserInfo.bind(this);
  }

  handleGameIdChange(event) {
    this.setState({ gameId: event.target.value });
  }

  handleDeckArchetypeChange(event) {
    this.setState({ deckArchetype: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleConfirmedPasswordChange(event) {
    this.setState({ confirmedPassword: event.target.value });
  }

  changePassword(userId) {
    return fetch(`/api/userpassword/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: this.state.password })
    })
      .then(response => response.json());
  }

  changeUserInfo(userId) {
    console.log(userId);
    return fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mainGameId: this.state.gameId,
        deckArchetype: this.state.deckArchetype,
        email: this.state.email
      })
    })
      .then(response => console.log(response.json()));
  }

  handleSubmit() {
    console.log(this.context);
    if (this.state.password && (this.state.gameId || this.state.deckArchetype || this.state.email)) {
      console.log('first');
      if (this.state.password === this.state.confirmedPassword) {
        console.log('second');
        Promise.all([
          this.changePassword(this.context.user.userId),
          this.changeUserInfo(this.context.user.userId)
        ])
          .catch(err => console.error(err));
      }
    } else if (this.state.password) {
      console.log('third');
      if (this.state.password === this.state.confirmedPassword) {
        this.changePassword(this.context.user.userId);
        console.log('fourth');
      }
    } else {
      console.log('fifth');
      this.changeUserInfo(this.context.user.userId)
        .catch(err => console.error(err));
    }
  }

  handleLogOut() {
    this.context.logOutUser();
    this.props.history.push('/secret');
  }

  render() {
    return (
      <>
        <div className="account-page-header">
          <i
            className="fas fa-angle-double-left"
            onClick={() => this.props.history.goBack()}
          ></i>
        </div>
        <div className="title">Settings</div>
        <div className="account-page-main">
          <select
            name="mainGame"
            className="input long-input"
            onChange={this.handleGameIdChange}
            value={this.state.gameId}
          >
            <option value="0">Change Main Game</option>
            <option value="1">Magic the Gathering</option>
            <option value="2">Yu-Gi-Oh</option>
          </select>
          <input
            type="text"
            className="input long-input"
            placeholder="Change Deck Archetype"
            onChange={this.handleDeckArchetypeChange}
            value={this.state.deckArchetype}
          />
          <input
            type="text"
            className="input long-input"
            placeholder="Change Email"
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
          <input
            type="password"
            className="input long-input"
            placeholder="Change Password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
          <input
            type="password"
            className="input long-input"
            placeholder="Confirm New Password"
            onChange={this.handleConfirmedPasswordChange}
            value={this.state.confirmedPassword}
          />
          <button className="input long-input confirm" type="submit"onClick={this.handleSubmit}>Confirm</button>
          <div className="account-page-footer">
            <button
              className="input long-input cancel"
              type="submit"
              onClick={this.handleLogOut}
            >
              Log Out
            </button>
          </div>
        </div>
      </>
    );
  }
}

AccountSettings.contextType = SRContext;
