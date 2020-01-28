import React from 'react';
import { NavLink } from 'react-router-dom';

export default function AccountPage(props) {
  return (
    <div className="account-page">
      <div className="account-page-header">
        <i className="fas fa-angle-double-left" onClick={() => props.history.goBack()}></i>
        <NavLink to={'/account/settings'}>
          <i className="fas fa-cog"></i>
        </NavLink>
      </div>
      <div className="account-page-main">
        <div className="user-info">
          <h1>User Name</h1>
          <h4>User Game || User Deck</h4>
        </div>
      </div>
      <div className="account-page-footer">
        <div className="title">Events</div>
        {/* {props.events.length ? props.events.map(event => <ItemPage event={event} key={event.eventId} history={props.history} />) : <div className="title">No Events</div>} */}
      </div>
    </div>
  );
}
