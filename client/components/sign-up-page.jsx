import React from 'react';
import ShadowRealmerIcon from './shadow-realmer-icon';

export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      deckArchetype: '',
      mainGameId: '',
      email: '',
      isStoreEmployee: false,
      password: '',
      confirmPassword: '',
      storeName: '',
      storeCode: '',
      validEmail: false,
      validPassword: false,
      samePassword: false
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleGameIdChange = this.handleGameIdChange.bind(this);
    this.handleDeckChange = this.handleDeckChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleStoreNameChange = this.handleStoreNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validation() {
    const emailRegex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const passwordRegex = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/);

    if (event.target.name === 'email') {
      if (!emailRegex.test(this.state.email)) {
        this.setState({ validEmail: false });
      } else {
        this.setState({ validEmail: true });
      }
    }
    if (event.target.name === 'password') {
      if (!passwordRegex.test(this.state.password)) {
        this.setState({ validPassword: false });
      } else {
        this.setState({ validPassword: true });
      }
    }
    if (event.target.name === 'confirmPassword') {
      if (this.state.password === this.state.confirmPassword) {
        this.setState({ samePassword: true });
      } else {
        this.setState({ samePassword: false });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.email !== prevState.email) {
      this.validation();
    } else if (this.state.password !== prevState.password) {
      this.validation();
    }
  }

  handleSubmit(info) {
    if (!this.state.validEmail || !this.state.validPassword) {
      // console.log('NO');
    } else {
      fetch(`/api/userNameCheck/${info.userName}`, {
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (!data.exists) {
            this.createUser(info);
          }
        })
        .catch(err => console.error(err));
    }
  }

  createUser(info) {
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    })
      .then(response => response.json())
      .then(userData => {
        // console.log(userData);
        this.props.logInUser(userData);
        // this.props.history.push('/');
      })
      .catch(err => console.error(err));
  }

  handleNameChange(event) {
    this.setState({ userName: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handlePasswordConfirmChange(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  handleGameIdChange(event) {
    this.setState({ mainGameId: event.target.value });
  }

  handleDeckChange(event) {
    this.setState({ deckArchetype: event.target.value });
  }

  handleStoreChange(event) {
    this.setState({ storeCode: event.target.value });
  }

  handleStoreNameChange(event) {
    this.setState({ storeName: event.target.value });
  }

  handleStoreSubmit(storeCode) {
    if (storeCode === '1234') {
      this.setState({ isStoreEmployee: true });
    }
  }

  renderStoreInput() {
    if (this.state.isStoreEmployee === true) {
      return (<input type="text" className="long-input input" placeholder="Store Name" onChange={this.handleStoreNameChange} value={this.state.storeName} />);
    }
  }

  render() {
    return (
      <div className="create-page">
        <div className="details-header">
          <i className="fas fa-angle-double-left" onClick={() => this.props.history.goBack()}></i>
          <ShadowRealmerIcon history={this.props.history} />
        </div>
        <header className="title">Sign up</header>
        <input type="text" className="long-input input" placeholder="User Name" onChange={this.handleNameChange} value={this.state.userName} />
        <input type="text" name="email" className="long-input input" placeholder="E-Mail" onChange={this.handleEmailChange} value={this.state.email} />
        <select name="game" className="input short-input" onChange={this.handleGameIdChange} value={this.state.mainGameId}>
          <option value="null">Game</option>
          <option value="1">Magic</option>
          <option value="2">Yu-Gi-Oh</option>
        </select>
        <input type="text" className="long-input input" placeholder="Deck Archetype" onChange={this.handleDeckChange} value={this.state.deckArchetype} />

        <div className="short-container">
          <input type="text" className="short-input input" placeholder="Store Code" onChange={this.handleStoreChange} value={this.state.storeCode} />
          <button className="short-input input store-confirm" onClick={() => this.handleStoreSubmit(this.state.storeCode)}>Confirm</button>
        </div>
        {this.renderStoreInput()}
        <div>Password</div>
        <input type="password" name="password" className="long-input input" placeholder="Password" onChange={this.handlePasswordChange} value={this.state.password} />
        <input type="password" name="confirmPassword" className="long-input input" placeholder="Confirm Password" onChange={this.handlePasswordConfirmChange} value={this.state.confirmPassword} />
        <div className="short-container">
          <button className="short-input input cancel" onClick={() => this.props.history.push('/')}>Cancel</button>
          <button className="short-input input confirm" onClick={() => this.handleSubmit(this.state)}>Sign Up!</button>
        </div>
      </div>
    );
  }
}
