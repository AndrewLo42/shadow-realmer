import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedStore: null };
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={this.props.zoom}
        center={this.props.center}
        defaultOptions={{
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false
        }}>
        {this.props.stores && this.props.stores.map(store => <Marker key={store.id} position={store.geometry.location} onClick={() => this.setState({ selectedStore: store })} />)}
        {this.state.selectedStore &&
        <InfoWindow position={this.state.selectedStore.geometry.location} onCloseClick={() => this.setState({ selectedStore: null })}>
          <div className="map-store-info">
            <h2>{this.state.selectedStore.name}</h2>
            <p>{this.state.selectedStore.formatted_address}</p>
          </div>
        </InfoWindow>
        }
      </GoogleMap>
    );
  }
}

const WrappedMap = withScriptjs(withGoogleMap(MapView));

export default function Map(props) {
  return (
    <WrappedMap
      googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=API_KEY!!!!'}
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '100%' }} />}
      mapElement={<div style={{ height: '100%' }} />}
      zoom={props.zoom}
      center={props.center}
      stores={props.stores}
    />
  );
}
