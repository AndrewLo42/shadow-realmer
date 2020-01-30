import React from 'react';
import ShadowRealmerIcon from './shadow-realmer-icon';
import { SRContext } from './context';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      showSearchBar: false
    };
    this.toggleSearchBar = this.toggleSearchBar.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnterKeyUp = this.handleEnterKeyUp.bind(this);
  }

  toggleSearchBar() {
    this.setState({ showSearchBar: !this.state.showSearchBar });
  }

  handleChange(event) {
    this.setState({
      inputText: event.target.value
    });
  }

  handleEnterKeyUp(event) {
    const isEnterKeyPress = event.keyCode === 13;
    if (isEnterKeyPress) {
      this.props.runSearch(this.state.inputText);
      this.setState({ inputText: '' });
      this.toggleSearchBar();
    }
  }

  render() {
    return (
      <SRContext.Consumer>{context => {
        return (
          <div className="navbar-container">
            <div className="navbar">
              <i className="navbar-sidebar-opener fa fa-bars" onClick={context.toggleSidebar} />
              <ShadowRealmerIcon history={this.props.history} />
              <i className={`navbar-search fa fa-search ${window.location.pathname === '/' && 'hidden'}`} onClick={this.toggleSearchBar} />
            </div>
            <div className={`search-bar-container ${this.state.showSearchBar && 'show-search-bar'}`}>
              <input className="search-bar-input" placeholder="Enter Zip Code" onChange={this.handleChange} onKeyUp={this.handleEnterKeyUp} value={this.state.inputText} />
            </div>
          </div>
        );
      }}
      </SRContext.Consumer>
    );
  }
}
