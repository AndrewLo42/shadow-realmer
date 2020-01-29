import React from 'react';
import ListPage from './list-page';
import HangoutDetailsPage from './hangout-details-page';
import EventDetailsPage from './event-details-page';
import CreatePage from './create-page';
import Sidebar from './sidebar';
import HomePage from './home-page';
import StoreFinder from './store-finder-page';
import StoreDetailsPage from './store-details-page';
import AccountPage from './account-page';
import AccountSettings from './account-settings-page';
import LogInPage from './log-in-page';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarHidden: true,
      user: null
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.logInUser = this.logInUser.bind(this);
  }

  toggleSidebar() {
    this.setState(prevState => ({
      isSidebarHidden: !prevState.isSidebarHidden
    }));
  }

  logInUser(user) {
    this.setState({ user });
  }

  render() {
    return (
      <Router>
        <Sidebar toggleSidebar={this.toggleSidebar} user={this.state.user} isSidebarHidden={this.state.isSidebarHidden} />
        <Switch>
          <Route exact path="/" render={props => <HomePage {...props} toggleSidebar={this.toggleSidebar} />} />
          <Route exact path="/hangouts" render={props => <ListPage {...props} toggleSidebar={this.toggleSidebar} />} />
          <Route exact path="/events" render={props => <ListPage {...props} toggleSidebar={this.toggleSidebar} />} />
          <Route exact path='/account/:userName' render={props => <AccountPage {...props} user={this.state.user} />} />
          <Route path='/account/:userName/settings' render={props => <AccountSettings {...props} user={this.state.user} />} />
          <Route path="/hangouts/:id" component={HangoutDetailsPage} />
          <Route path="/events/:id" component={EventDetailsPage} />
          <Route path="/create/hangouts" component={CreatePage} />
          <Route path="/create/events" component={CreatePage} />
          <Route path='/stores' render={props => <StoreFinder {...props} toggleSidebar={this.toggleSidebar} />} />
          <Route path="/store/:name" component={StoreDetailsPage} />
          <Route path="/log-in" render={props => <LogInPage {...props} logInUser={this.logInUser} />} />
        </Switch>
      </Router>
    );
  }
}
