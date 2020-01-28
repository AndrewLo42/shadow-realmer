import React from 'react';
import SearchBar from './search-bar';
import Map from './map';

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
    const getCenter = fetch(`/api/zipcode/?zipcode=${zipcode}`).then(res => res.json());
    const getResults = fetch(`/api/search/?zipcode=${zipcode}`).then(res => res.json());
    Promise
      .all([getCenter, getResults])
      .then(result => {
        this.setState({
          center: result[0].results[0].geometry.location,
          stores: result[1].results
        });
      })
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
