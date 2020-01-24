import React from 'react';
import HangoutsList from './hangouts-list';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import HangoutDetails from './hangout-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/hangouts" component={HangoutsList} />
          <Route path="/hangouts/:id" component={HangoutDetails} />
        </Switch>
      </Router>
    );
  }
}
