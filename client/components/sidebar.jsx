import React from 'react';

const Sidebar = props => {

  const handlePageListItemClick = () => {
    props.toggleSidebar();
    // TODO: add routing
  };

  return (
    <>
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
          <div className="sidebar-page-list-item" onClick={handlePageListItemClick}>
            <i className="fas fa-home" />
              Home
          </div>
          <div className="sidebar-page-list-item" onClick={handlePageListItemClick}>
            <i className="fas fa-bullhorn" />
            Hangouts
          </div>
        </div>
      </div>
      <div
        className={`sidebar-shadow ${props.isSidebarHidden ? 'shadow-hidden' : null}`}
        onClick={props.toggleSidebar}>
      </div>
    </>
  );
};

export default Sidebar;
