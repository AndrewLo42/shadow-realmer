import React from 'react';
import HangoutsList from './hangouts-list';
import SearchBar from './search-bar';
import Sidebar from './sidebar';
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
        <SearchBar toggleSidebar={this.toggleSidebar} />
        <Sidebar toggleSidebar={this.toggleSidebar} isSidebarHidden={this.state.isSidebarHidden} />
        <Switch>
          <Route exact path="/hangouts" component={HangoutsList} />
          <Route path="/hangouts/:id" component={HangoutDetails} />
        </Switch>
      </Router>
    );
  }
}
