import React from 'react';
import Map from './map';
import EventItem from './event-item-page';

export default class StoreDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      events: [],
      isLoading: true
    };
    this.getInfo = this.getInfo.bind(this);
    this.getAddress = this.getAddress.bind(this);
    this.getStoreEvents = this.getStoreEvents.bind(this);
  }

  getAddress(storeName) {
    return fetch(`/api/address/?storeName=${storeName}`)
      .then(response => response.json())
      .then(addresses => addresses.results.find(store => store.name === storeName));
  }

  getStoreEvents(storeName) {
    return fetch(`/api/storeEvents/${storeName}`)
      .then(response => response.json());
  }

  getInfo() {
    Promise
      .all([
        this.getAddress(this.props.match.params.name),
        this.getStoreEvents(this.props.match.params.name)])
      .then(response => {
        this.setState({
          details: response[0],
          events: response[1],
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.getInfo();
  }

  render() {
    return !this.state.isLoading
      ? <StoreDetails details={this.state.details} events={this.state.events} history={this.props.history} />
      : <div className="title">Loading...</div>;
  }
}

function StoreDetails(props) {
  return (
    <div className="details-container">
      <div className="details-header">
        <i className="fas fa-angle-double-left" onClick={() => props.history.goBack()}></i>
      </div>
      <div className="details-map">
        {props.details.geometry && <Map zoom={14} center={props.details.geometry.location} stores={[props.details]} />}
      </div>
      <div className="store-details-main">
        <h1 style={{ color: '#9984F1' }} className="details-title">{props.details.name}</h1>
        <h3>{props.details.formatted_address}</h3>
        {props.details.opening_hours && props.details.opening_hours.open_now
          ? <h5 style={{ color: 'green' }}>Open Now</h5>
          : <h5 style={{ color: 'red' }}>Closed</h5>}
      </div>
      <div className="store-details-footer">
        <h2 className="details-contact-info-title">Events</h2>
        {props.events.length
          ? props.events.map(event => <EventItem event={event} key={event.eventId} history={props.history} />)
          : <div className="title">No Scheduled Events</div>}
      </div>
    </div>
  );
}
