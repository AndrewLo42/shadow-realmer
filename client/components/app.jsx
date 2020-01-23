import React from 'react';
import SearchBar from './search-bar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SearchBar placeholder={'Enter a ZIP code'} />
    );
  }
}
