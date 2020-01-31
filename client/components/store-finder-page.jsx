import React from 'react';
import NavBar from './navbar';
import Map from './map';
import SRContext from './context';

export default function StoreFinder(props) {
  return (
    <SRContext.Consumer>{context => {
      return (
        <>
          <NavBar {...props} runSearch={context.findStores} />
          <div className="map-container">
            <Map zoom={12} center={context.currentView.center} stores={context.currentView.stores} />
          </div>
        </>
      );
    }}
    </SRContext.Consumer>
  );
}
