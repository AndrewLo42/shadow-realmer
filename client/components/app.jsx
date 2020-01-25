import React from 'react';
import HangoutsList from './hangouts-list';
import HangoutDetails from './hangout-details';
import CreateHangout from './create-hangouts';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

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
          <Route path="/create/hangout" component={CreateHangout} />
        </Switch>
      </Router>
    );
  }
}
