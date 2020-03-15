import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, Circle } from 'react-google-maps';
import { NavLink } from 'react-router-dom';

function MapView(props) {
  const [selectedStore, setSelectedStore] = useState(null);

  let circle = null;
  if (window.location.pathname.includes('hangout')) {
    circle = <Circle
      center={props.center}
      radius={1250}
      defaultOptions={{
        fillColor: '#9984F1'
      }} />;
  }

  return (
    <GoogleMap
      defaultZoom={props.zoom}
      center={props.center}
      defaultOptions={{
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false
      }}>
      {props.stores && props.stores.map(store => <Marker key={store.id} position={store.geometry.location} onClick={() => setSelectedStore(store)} />)}
      {selectedStore &&
        <InfoWindow position={selectedStore.geometry.location} onCloseClick={() => setSelectedStore(null)}>
          <div className="map-store-info">
            <h2>{selectedStore.name}</h2>
            <p>{selectedStore.formatted_address}</p>
            <NavLink to={`/store/${selectedStore.name}`}>
              <div className="small-text">See Store Events</div>
            </NavLink>
          </div>
        </InfoWindow>
      }
      {circle}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(MapView));

export default function Map(props) {
  return (
    <WrappedMap
      googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAzm3jP30c24nZuF6Ct7PBgCAkxV1lzDuM'}
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '100%' }} />}
      mapElement={<div style={{ height: '100%' }} />}
      zoom={props.zoom}
      center={props.center}
      stores={props.stores}
    />
  );
}
