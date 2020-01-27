import React from 'react';
import ListPage from './list-page';
import DetailsPage from './details-page';
import CreatePage from './create-page';
import Sidebar from './sidebar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import HomePage from './home-page';

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
          <Route exact path="/" render={props => <HomePage {...props} toggleSidebar={this.toggleSidebar} />} />
          <Route exact path="/hangouts" render={props => <ListPage {...props} toggleSidebar={this.toggleSidebar} />} />
          <Route exact path="/events" render={props => <ListPage {...props} toggleSidebar={this.toggleSidebar} />} />
          <Route path="/hangouts/:id" component={DetailsPage} />
          <Route path="/events/:id" component={DetailsPage} />
          <Route path="/create/hangouts" component={CreatePage} />
          <Route path="/create/events" component={CreatePage} />
        </Switch>
      </Router>
    );
  }
}
