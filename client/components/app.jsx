import React from 'react';
import ListPage from './list-page';
import HangoutDetails from './hangout-details';
import CreatePage from './create-page';
import Sidebar from './sidebar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import FakeHomePage from './placeholder-homepage';

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
          <Route exact path="/" render={props => <FakeHomePage {...props} toggleSidebar={this.toggleSidebar} />} />
          <Route exact path="/hangouts" render={props => <ListPage {...props} toggleSidebar={this.toggleSidebar} />} />
          <Route exact path="/events" render={props => <ListPage {...props} toggleSidebar={this.toggleSidebar} />} />
          <Route path="/hangouts/:id" component={HangoutDetails} />
          <Route path="/create/hangout" component={CreatePage} />
          <Route path="/create/event" component={CreatePage} />
        </Switch>
      </Router>
    );
  }
}
