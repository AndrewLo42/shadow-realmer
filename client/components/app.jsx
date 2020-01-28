import React from 'react';
import ListPage from './list-page';
import HangoutDetailsPage from './hangout-details-page';
import EventDetailsPage from './event-details-page';
import CreatePage from './create-page';
import Sidebar from './sidebar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import HomePage from './home-page';
import StoreFinder from './store-finder-page';
import StoreDetailsPage from './store-details-page';
import SignInPage from './sign-in-page';
import SignUpPage from './sign-up-page';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarHidden: true,
      user: null
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.signInUser = this.signInUser.bind(this);
  }

  toggleSidebar() {
    this.setState(prevState => ({
      isSidebarHidden: !prevState.isSidebarHidden
    }));
  }

  signInUser(user) {
    this.setState({ user });
  }

  render() {
    return (
      <Router>
        <Sidebar toggleSidebar={this.toggleSidebar} isSidebarHidden={this.state.isSidebarHidden} />
        <Switch>
          <Route exact path="/" render={props => <HomePage {...props} toggleSidebar={this.toggleSidebar} />} />
          <Route exact path="/hangouts" render={props => <ListPage {...props} toggleSidebar={this.toggleSidebar} />} />
          <Route exact path="/events" render={props => <ListPage {...props} toggleSidebar={this.toggleSidebar} />} />
          <Route path="/hangouts/:id" component={HangoutDetailsPage} />
          <Route path="/events/:id" component={EventDetailsPage} />
          <Route path="/create/hangouts" component={CreatePage} />
          <Route path="/create/events" component={CreatePage} />
          <Route path='/stores' render={props => <StoreFinder {...props} toggleSidebar={this.toggleSidebar} />} />
          <Route path="/store/:name" component={StoreDetailsPage} />
          <Route path="/sign-in" component={SignInPage} signInUser={this.signInUser} />
          <Route path="/sign-up" component={SignUpPage} signInUser={this.signInUser} />
        </Switch>
      </Router>
    );
  }
}
