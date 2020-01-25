import React from 'react';
import HangoutsList from './hangouts-list';
import HangoutDetails from './hangout-details';
import CreateHangout from './create-hangouts';
import Sidebar from './sidebar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarHidden: true
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  toggleSidebar() {
    this.setState(prevState => ({
      isSidebarHidden: !prevState.isSidebarHidden
    }));
  }

  render() {
    return (
      <Router>
        <Sidebar toggleSidebar={this.toggleSidebar} isSidebarHidden={this.state.isSidebarHidden} />
        <Switch>
          <Route exact path="/hangouts" render={props => <HangoutsList {...props} toggleSidebar={this.toggleSidebar} />} />
          <Route path="/hangouts/:id" component={HangoutDetails} />
          <Route path="/create/hangout" component={CreateHangout} />
        </Switch>
      </Router>
    );
  }
}
