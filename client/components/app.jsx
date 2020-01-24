import React from 'react';
import HangoutsList from './hangouts-list';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return <HangoutsList />;
  }
}
