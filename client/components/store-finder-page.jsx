import React from 'react';
import SearchBar from './search-bar';
import Map from './map';
import Geocode from 'react-geocode';

export default class StoreFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      center: { lat: 33.634844, lng: -117.740513 }
    };
    this.findStores = this.findStores.bind(this);
  }

  findStores(zipcode) {
    Geocode.setApiKey('AIzaSyAzm3jP30c24nZuF6Ct7PBgCAkxV1lzDuM');
    Geocode.fromAddress(zipcode)
      .then(data => this.setState({ center: data.results[0].geometry.location }));
    fetch(`/api/search/?zipcode=${zipcode}`)
      .then(data => data.json())
      .then(results => this.setState({ stores: results.results }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <>
        <SearchBar {...this.props} runSearch={this.findStores} placeholder='Enter Zip Code'/>
        <div className="map-container">
          <Map zoom={12} center={this.state.center} stores={this.state.stores} />
        </div>
      </>
    );
  }
}
