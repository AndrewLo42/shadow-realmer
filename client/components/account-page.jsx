import React from 'react';
import ItemPage from './item-page';
import { NavLink } from 'react-router-dom';

export default class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    fetch(`/api/eventAttendees?userId=${this.props.user.userId}`)
      .then(data => data.json())
      .then(events => {
        this.setState({ events });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      this.props.user
        ? <div className="account-page">
          <div className="account-page-header">
            <i className="fas fa-angle-double-left" onClick={() => this.props.history.goBack()}></i>
            <NavLink to={`/account/${this.props.user.userName}/settings`}>
              <i className="fas fa-cog"></i>
            </NavLink>
          </div>
          <div className="account-page-main">
            <i className="user-icon far fa-user-circle"></i>
            <div className="user-info">
              <h2>{this.props.user.userName}</h2>
              <div className="user-details-text">{this.props.user.mainGameId === 1 ? 'Magic' : 'Yu-Gi-Oh'} || {this.props.user.deckArchetype}</div>
            </div>
          </div>
          <div className="account-page-footer">
            <div className="title">Events</div>
            {this.state.events.length ? this.state.events.map(event => <ItemPage event={event} key={event.eventId} history={this.props.history} />) : <div className="title">No Events</div>}
          </div>
        </div>
        : null
    );
  }
}
