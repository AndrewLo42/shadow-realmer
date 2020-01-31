import React from 'react';
import {
  NavLink
} from 'react-router-dom';
import SRContext from './context';

export default function Sidebar(props) {
  return (
    <SRContext.Consumer>{context => {
      return (
        <>
          <div className={`sidebar-container ${!context.showSidebar && 'off-screen-left'}`}>
            <i className="sidebar-exit-button fas fa-times" onClick={context.toggleSidebar} />
            {context.user
              ? <UserLoggedIn user={context.user} toggleSidebar={context.toggleSidebar} />
              : <NoUserLoggedIn toggleSidebar={context.toggleSidebar} />}
            <div className="sidebar-page-list">
              <ul className="sidebar-list-items" onClick={context.toggleSidebar}>
                <li >
                  <NavLink to={'/'} className="sidebar-page-list-item sidebar-home" >
                    <i className="fas fa-home" />
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'/events'} className="sidebar-page-list-item sidebar-events">
                    <i className="fas fa-calendar-alt" />
                    Events
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'/hangouts'} className="sidebar-page-list-item sidebar-hangouts">
                    <i className="fas fa-bullhorn" />
                    Hangouts
                  </NavLink>
                </li>
                <li>
                  <NavLink to={'/stores'} className="sidebar-page-list-item sidebar-store-finder">
                    <i className="fas fa-store-alt" />
                    Store Finder
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={`sidebar-shadow ${!context.showSidebar && 'shadow-hidden'}`}
            onClick={context.toggleSidebar}>
          </div>
        </>
      );
    }}
    </SRContext.Consumer>
  );
}

function UserLoggedIn(props) {
  return (
    <NavLink to={`/account/${props.user.userName}`} className="sidebar-header" onClick={props.toggleSidebar}>
      <i className="user-icon far fa-user-circle"></i>
      <div className="user-info">
        <h2>{props.user.userName}</h2>
        <div className="user-details-text">{props.user.mainGameId === 1 ? 'Magic' : 'Yu-Gi-Oh'} || {props.user.deckArchetype}</div>
      </div>
    </NavLink>
  );
}

function NoUserLoggedIn(props) {
  return (
    <NavLink to={'/log-in/'} className="sidebar-header" onClick={props.toggleSidebar}>
      <i className="user-icon far fa-user-circle"></i>
      <div className="user-info">
        <h3>Log In / Sign Up</h3>
      </div>
    </NavLink>
  );
}
