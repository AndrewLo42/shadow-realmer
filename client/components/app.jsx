import React from 'react';
import ListPage from './list-page';
import HangoutDetailsPage from './hangout-details-page';
import EventDetailsPage from './event-details-page';
import CreatePage from './create-page';
import HomePage from './home-page';
import StoreFinder from './store-finder-page';
import StoreDetailsPage from './store-details-page';
import AccountPage from './account-page';
import AccountSettings from './account-settings-page';
import LogInPage from './log-in-page';
import SignUpPage from './sign-up-page';
import SecretPage from './secret-page';
import Sidebar from './sidebar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import SRContext from './context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showSidebar: false
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.logInUser = this.logInUser.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
  }

  toggleSidebar() {
    this.setState({ showSidebar: !this.state.showSidebar });
  }

  logInUser(user) {
    this.setState({ user });
  }

  logOutUser() {
    fetch('/api/usersLogout', {
      method: 'POST'
    })
      .then(() => {
        this.setState({ user: null });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    fetch('api/users')
      .then(response => {
        return response.json();
      })
      .then(userData => {
        if (userData.error) {
          this.setState({ user: null });
        } else {
          this.setState({ user: userData });
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    const user = this.state.user;
    const showSidebar = this.state.showSidebar;
    const toggleSidebar = this.toggleSidebar;
    const logInUser = this.logInUser;
    const logOutUser = this.logOutUser;
    return (
      <SRContext.Provider value={{
        user,
        showSidebar,
        toggleSidebar,
        logInUser,
        logOutUser
      }}>
        <Router>
          <Sidebar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/hangouts" render={props => <ListPage {...props} key="hangouts" />} />
            <Route exact path="/events" render={props => <ListPage {...props} key="events" />} />
            <Route exact path='/account/:userName' component={AccountPage} />
            <Route path='/account/:userName/settings' component={AccountSettings} />
            <Route path="/hangouts/:id" component={HangoutDetailsPage} />
            <Route path="/events/:id" component={EventDetailsPage} />
            <Route path="/create/hangouts" component={CreatePage} />
            <Route path="/create/events" component={CreatePage} />
            <Route path='/stores' component={StoreFinder} />
            <Route path="/store/:name" component={StoreDetailsPage} />
            <Route path="/log-in" component={LogInPage} />
            <Route path="/sign-up" component={SignUpPage} />
            <Route path="/secret" component={SecretPage} />
          </Switch>
        </Router>
      </SRContext.Provider>
    );
  }
}
