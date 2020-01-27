import React from 'react';
import {
  NavLink
} from 'react-router-dom';

const Sidebar = props => {
  const handlePageListItemClick = () => {
    props.toggleSidebar();
  };

  return (
    <>
      <div className={`sidebar-container ${props.isSidebarHidden && 'off-screen-left'}`}>
        <i className="sidebar-exit-button fas fa-times" onClick={props.toggleSidebar}></i>
        <div className="sidebar-header">
          <i className="sidebar-user-icon far fa-user-circle"></i>
          <div className="sidebar-user-info">
            <h2>User Name</h2>
            <h4>User Game || User Deck</h4>
          </div>
        </div>
        <div className="sidebar-page-list">
          <ul className="sidebar-list-items" onClick={handlePageListItemClick}>
            <li >
              <NavLink to={'/'} className="sidebar-page-list-item sidebar-home" >
                <i className="fas fa-home" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to={'/hangouts'} className="sidebar-page-list-item sidebar-hangouts">
                <i className="fas fa-bullhorn"/> Hangouts
              </NavLink>
            </li>
            <li>
              <NavLink to={'/events'} className="sidebar-page-list-item sidebar-events">
                <i className="fas fa-calendar-alt"/> Events
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`sidebar-shadow ${props.isSidebarHidden && 'shadow-hidden'}`}
        onClick={props.toggleSidebar}>
      </div>
    </>
  );
};

export default Sidebar;
