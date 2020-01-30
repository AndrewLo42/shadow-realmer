import React from 'react';
import { NavLink } from 'react-router-dom';
import { SRContext } from './context';

export default function AccountPage(props) {
  return (
    <SRContext.Consumer>{context => {
      return (
        <div className="account-page">
          <div className="account-page-header">
            <i className="fas fa-angle-double-left" onClick={() => props.history.goBack()}></i>
            <NavLink to={`/account/${context.user.userName}/settings`}>
              <i className="fas fa-cog"></i>
            </NavLink>
          </div>
          <div className="account-page-main">
            <i className="user-icon far fa-user-circle"></i>
            <div className="user-info">
              <h2>{context.user.userName}</h2>
              <div className="user-details-text">{context.user.mainGameId === 1 ? 'Magic' : 'Yu-Gi-Oh'} || {context.user.deckArchetype}</div>
            </div>
          </div>
          <div className="account-page-footer">
            <div className="title">Events</div>
            {/* {props.events.length ? props.events.map(event => <ItemPage event={event} key={event.eventId} history={props.history} />) : <div className="title">No Events</div>} */}
          </div>
        </div>
      );
    }}
    </SRContext.Consumer>
  );
}
