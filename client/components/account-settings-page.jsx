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
      confirmedPassword: '',
      validEmail: true,
      validPassword: true,
      submitted: false,
      passwordMatch: true
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
    });
  }

  changeUserInfo(userId) {
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
    });
  }

  handleSubmit() {
    const emailRegex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const passwordRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/);
    this.setState({ submitted: true });
    if (this.state.email) {
      if (!emailRegex.test(this.state.email)) {
        this.setState({ validEmail: false });
        return;
      }
    }
    if (this.state.password) {
      if (!passwordRegex.test(this.state.password)) {
        this.setState({ validPassword: false });
      }
    }
    if (this.state.password) {
      if (this.state.password !== this.state.confirmedPassword) {
        this.setState({ passwordMatch: false });
        return;
      }
    }

    if ((this.state.password) && (this.state.gameId || this.state.deckArchetype || this.state.email)) {
      if (this.state.passwordMatch) {
        Promise.all([
          this.changePassword(this.context.user.userId),
          this.changeUserInfo(this.context.user.userId)
        ])
          .then(() => {
            this.context.getUser();
            this.props.history.goBack();
          })
          .catch(err => console.error(err));
      }
    } else if (this.state.password) {
      if (this.state.passwordMatch) {
        this.changePassword(this.context.user.userId)
          .then(() => {
            this.context.getUser();
            this.props.history.goBack();
          });
      }
    } else {
      this.changeUserInfo(this.context.user.userId)
        .then(() => {
          this.context.getUser();
          this.props.history.goBack();
        })
        .catch(err => console.error(err));
    }
  }

  handleLogOut() {
    this.context.logOutUser();
    this.props.history.push('/signed-out');
  }

  renderEmailError() {
    if (!this.state.validEmail && this.state.submitted) {
      return (<div className=" error-blurb">Not a valid email</div>);
    }
  }

  renderPasswordError() {
    if (!this.state.validPassword && this.state.submitted) {
      return (
        <div className=" error-blurb">
          <div>Password requires</div>
          <div> 7 Characters with at least 1 number</div>
        </div>);
    }
  }

  renderConfirmPasswordError() {
    if (!this.state.samePassword && this.state.submitted) {
      return (<div className=" error-blurb">Passwords did not Match</div>);
    }
  }

  render() {
    let invalidEmail = null;
    let invalidPassword = null;
    let invalidConfirm = null;
    if (this.state.submitted) {
      invalidEmail = this.state.validEmail === false ? 'is-invalid' : null;
      invalidPassword = this.state.validPassword === false ? 'is-invalid' : null;
      invalidConfirm = this.state.passwordMatch === false ? 'is-invalid' : null;

    }
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
            className={`long-input input ${invalidEmail}`}
            name="email"
            placeholder="Change Email"
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
          {this.renderEmailError()}
          <input
            type="password"
            className={`long-input input ${invalidPassword}`}
            placeholder="Change Password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
          {this.renderPasswordError()}
          <input
            type="password"
            className={`long-input input ${invalidConfirm}`}
            placeholder="Confirm New Password"
            onChange={this.handleConfirmedPasswordChange}
            value={this.state.confirmedPassword}
          />
          {this.renderConfirmPasswordError()}
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
