import React from 'react';
import ShadowRealmerIcon from './shadow-realmer-icon';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnterKeyUp = this.handleEnterKeyUp.bind(this);
  }

  handleChange(event) {
    this.setState({
      inputText: event.target.value
    });
  }

  handleEnterKeyUp(event) {
    const isEnterKeyPress = event.keyCode === 13;
    if (isEnterKeyPress) {
      // TODO: Add call of callback from props
    }
  }

  render() {
    return (
      <div className="search-bar-container">
        <div className="search-bar">
          <ShadowRealmerIcon />
          <input className="search-bar-input" placeholder="Enter Stuff" onChange={this.handleChange} onKeyUp={this.handleEnterKeyUp} />
        </div>
      </div>
    );
  }
}
