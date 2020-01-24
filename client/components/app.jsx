import React from 'react';
import HangoutDetails from './hangout-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <HangoutDetails />
    );
  }
}
