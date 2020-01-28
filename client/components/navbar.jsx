import React from 'react';
import ShadowRealmerIcon from './shadow-realmer-icon';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      searchBarShowing: false
    };
    this.toggleSearchBar = this.toggleSearchBar.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEnterKeyUp = this.handleEnterKeyUp.bind(this);
  }

  toggleSearchBar() {
    this.setState({ searchBarShowing: !this.state.searchBarShowing });
  }

  handleChange(event) {
    this.setState({
      inputText: event.target.value
    });
  }

  handleEnterKeyUp(event) {
    const isEnterKeyPress = event.keyCode === 13;
    if (isEnterKeyPress) {
      this.props.runSearch(this.state.inputText, window.location.pathname);
      this.setState({ inputText: '' });
      this.toggleSearchBar();
    }
  }

  render() {
    return (
      <div className="navbar-container">
        <div className="navbar">
          <i className="navbar-sidebar-opener fa fa-bars" onClick={this.props.toggleSidebar} />
          <ShadowRealmerIcon history={this.props.history} />
          <i className={`navbar-search fa fa-search ${window.location.pathname === '/' && 'hidden'}`} onClick={this.toggleSearchBar} />
        </div>
        <div className={`search-bar-container ${this.state.searchBarShowing && 'show-search-bar'}`}>
          <input className="search-bar-input" placeholder={this.props.placeholder} onChange={this.handleChange} onKeyUp={this.handleEnterKeyUp} value={this.state.inputText} />
        </div>
      </div>
    );
  }
}
