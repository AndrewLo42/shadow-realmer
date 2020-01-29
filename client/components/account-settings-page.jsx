import React from 'react';

export default class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: '',
      gameFormat: '',
      password: '',
      confirmedPassword: ''
    };
    this.handleGameIdChange = this.handleGameIdChange.bind(this);
    this.handleGameFormatChange = this.handleGameFormatChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmedPasswordChange = this.handleConfirmedPasswordChange.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleGameIdChange(event) {
    this.setState({ gameId: event.target.value });
  }

  handleGameFormatChange(event) {
    this.setState({ gameFormat: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleConfirmedPasswordChange(event) {
    this.setState({ confirmedPassword: event.target.value });
  }

  handleSubmit() {
    if (this.state.password === this.state.confirmedPassword) {
      // Do Work here
    }
  }

  handleLogOut() {
    this.props.logOutUser();
    this.props.history.push('/');
  }

  render() {
    return (
      <>
        <div className="account-page-header">
          <i className="fas fa-angle-double-left" onClick={() => this.props.history.goBack()}></i>
        </div>
        <div className="title">Settings</div>
        <div className="account-page-main">
          <select name="mainGame" className="input long-input" onChange={this.handleGameIdChange} value={this.state.gameId} >
            <option value="null">Change Main Game</option>
            <option value="1">Magic the Gathering</option>
            <option value="2">Yu-Gi-Oh</option>
          </select>
          <input type="text" className="input long-input" placeholder="Change Deck Archetype" onChange={this.handleGameFormatChange} value={this.state.gameFormat} />
          <input type="password" className="input long-input" placeholder="Change Password" onChange={this.handlePasswordChange} value={this.state.password} />
          <input type="password" className="input long-input" placeholder="Confirm Password" onChange={this.handleConfirmedPasswordChange} value={this.state.confirmedPassword} />
          <button className="input long-input confirm">Confirm</button>
          <div className="account-page-footer">
            <button className="input long-input cancel" type="submit" onClick={this.handleLogOut}>Log Out</button>
          </div>
        </div>
      </>
    );
  }
}
