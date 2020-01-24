import React from 'react';

const Sidebar = props => {
  return (
    <div className={`sidebar-container ${props.isSidebarHidden ? 'off-screen-left' : null}`}>
      <i className="sidebar-exit-button fas fa-times" onClick={props.toggleSidebar}></i>
      <div className="sidebar-header">
        <i className="sidebar-user-icon far fa-user-circle"></i>
        <div className="sidebar-user-info">
          <h2>User Name</h2>
          <h4>User Game || User Deck</h4>
        </div>
      </div>
      <div className="sidebar-page-list">
        <div className="sidebar-page-list-item">
          <i className="fas fa-bullhorn" />
          Hangouts
        </div>
        <div className="sidebar-page-list-item">
          <i className="fas fa-home" />
          Home
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
