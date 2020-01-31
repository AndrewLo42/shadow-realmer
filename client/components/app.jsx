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
import SignOutPage from './sign-out-page';
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
      currentView: {
        stores: [],
        center: { lat: 33.634844, lng: -117.740513 }
      },
      showSidebar: false,
      isAuthorizing: true
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.logInUser = this.logInUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
    this.findStores = this.findStores.bind(this);
  }

  toggleSidebar() {
    this.setState({ showSidebar: !this.state.showSidebar });
  }

  logInUser(user) {
    this.setState({ user });
  }

  getUser() {
    fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(userData => {
        if (userData.error) {
          this.setState({
            user: null,
            isAuthorizing: false
          });
        } else {
          this.setState({
            user: userData,
            isAuthorizing: false
          });
        }
      })
      .catch(err => console.error(err));
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

  findStores(zipcode) {
    const getCenter = fetch(`/api/zipcode/?zipcode=${zipcode}`).then(res => res.json());
    const getResults = fetch(`/api/search/?zipcode=${zipcode}`).then(res => res.json());
    Promise
      .all([getCenter, getResults])
      .then(result => {
        this.setState({
          currentView: {
            center: result[0].results[0].geometry.location,
            stores: result[1].results
          }
        });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const user = this.state.user;
    const showSidebar = this.state.showSidebar;
    const toggleSidebar = this.toggleSidebar;
    const logInUser = this.logInUser;
    const getUser = this.getUser;
    const logOutUser = this.logOutUser;
    const findStores = this.findStores;
    const currentView = this.state.currentView;
    if (this.state.isAuthorizing) return null;
    return (
      <SRContext.Provider value={{
        user,
        showSidebar,
        toggleSidebar,
        logInUser,
        getUser,
        logOutUser,
        findStores,
        currentView
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
            <Route path="/signed-out" component={SignOutPage} />
          </Switch>
        </Router>
      </SRContext.Provider>
    );
  }
}
