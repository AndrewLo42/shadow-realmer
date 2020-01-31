import React from 'react';
import EventItem from './event-item-page';
import { NavLink } from 'react-router-dom';
import SRContext from './context';

export default class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    fetch(`/api/eventAttendees?userId=${this.context.user.userId}`)
      .then(data => data.json())
      .then(events => {
        this.setState({ events });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="account-page">
        <div className="account-page-header">
          <i className="fas fa-angle-double-left" onClick={() => this.props.history.push('/')}></i>
          <NavLink to={`/account/${this.context.user.userName}/settings`}>
            <i className="fas fa-cog"></i>
          </NavLink>
        </div>
        <div className="account-page-main">
          <i className="user-icon far fa-user-circle"></i>
          <div className="user-info">
            <h2>{this.context.user.userName}</h2>
            <div className="user-details-text">{this.context.user.mainGameId === 1 ? 'Magic' : 'Yu-Gi-Oh'} || {this.context.user.deckArchetype}</div>
          </div>
        </div>
        <div className="account-page-footer">
          <div className="title">Events</div>
          {this.state.events.length ? this.state.events.map(event => <EventItem event={event} key={event.eventId} history={this.props.history} />) : <div className="title">No Events</div>}
        </div>
      </div>
    );
  }
}

AccountPage.contextType = SRContext;
