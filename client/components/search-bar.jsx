import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      inputText: event.target.value
    });
  }

  render() {
    return (
      <input placeholder="Enter Stuff" onChange={this.handleChange} />
    );
  }
}
