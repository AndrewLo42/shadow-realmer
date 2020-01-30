import React from 'react';
import Map from './map';
import { EventItem } from './item-page';

export default class StoreDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      events: []
    };
    this.getAddress = this.getAddress.bind(this);
    this.getStoreEvents = this.getStoreEvents.bind(this);
  }

  getAddress() {
    fetch(`/api/address/?storeName=${this.props.match.params.name}`)
      .then(data => data.json())
      .then(result => result.results.filter(store => store.name === this.props.match.params.name))
      .then(data => this.setState({ details: data[0] }))
      .catch(err => console.error(err));
  }

  getStoreEvents() {
    fetch(`/api/storeEvents/${this.props.match.params.name}`)
      .then(data => data.json())
      .then(result => this.setState({ events: result }))
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getAddress();
    this.getStoreEvents();
  }

  render() {
    return this.state.details
      ? <StoreDetails details={this.state.details} events={this.state.events} history={this.props.history} />
      : <div className="title">Loading...</div>;
  }
}

function StoreDetails(props) {
  return (
    <div className="details-container">
      <div className="details-header">
        <i className="fas fa-angle-double-left" onClick={() => props.history.goBack()}></i>
        <i className="fas fa-poo-storm"></i>
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
