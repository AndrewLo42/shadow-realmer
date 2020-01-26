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
      this.props.runSearch(this.state.inputText, this.props.match.path);
      this.setState({ inputText: '' });
    }
  }

  render() {
    return (
      <div className="search-bar-container">
        <div className="search-bar">
          <ShadowRealmerIcon toggleSidebar={this.props.toggleSidebar} />
          <input className="search-bar-input" placeholder={this.props.placeholder} onChange={this.handleChange} onKeyUp={this.handleEnterKeyUp} value={this.state.inputText} />
          <span className="add-hangout" onClick={() => this.props.history.push(`/create${this.props.match.path}`)}><i className="fa fa-plus"></i></span>
        </div>
      </div>
    );
  }
}
