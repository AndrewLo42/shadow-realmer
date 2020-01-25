import React from 'react';
import SearchBar from './search-bar';

export default function FakeHomePage(props) {
  return (
    <>
      <SearchBar toggleSidebar={props.toggleSidebar} history={props.history} placeholder="Yee Dawg" />
      <div className="title">Hello</div>
    </>
  );
}
