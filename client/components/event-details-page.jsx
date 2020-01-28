import React from 'react';
import Map from './map';

export default class HangoutDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,
      address: {}
    };
    this.getDetails = this.getDetails.bind(this);

  }

  getDetails() {
    fetch(`/api/events/?id=${this.props.match.params.id}`)
      .then(data => data.json())
      .then(result => this.setState({ details: result }))
      .then(data => this.getAddress())
      .catch(err => console.error(err));
  }

  getAddress() {
    fetch(`/api/address/?storeName=${this.state.details.storeName}`)
      .then(data => data.json())
      .then(result => result.results.filter(store => store.name === this.state.details.storeName))
      .then(data => this.setState({ address: data[0] }))
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getDetails();
  }

  render() {
    return this.state.details ? <EventDetails details={this.state.details} history={this.props.history} address={this.state.address} /> : <div className="title">Loading...</div>;
  }
}

function EventDetails(props) {
  const startTime = new Date(props.details.startTime);
  const dateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  const startTimeFormatted = new Intl.DateTimeFormat('en-US', dateTimeFormatOptions).format(startTime);
  return (
    <div className="details-container">
      <div className="details-header">
        <i className="fas fa-angle-double-left" onClick={() => props.history.goBack()}></i>
        <i className="fas fa-poo-storm"></i>
      </div>
      <div className="details-map">
        {props.address.geometry && <Map zoom={14} match={props.match} center={props.address.geometry.location} stores={[props.address]} />}
      </div>
      <div className="details-main">
        <h1 className="details-title">{props.details.hangoutName}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>{startTimeFormatted}</h3>
          <h3>{props.details.gameFormat}</h3>
        </div>
        <p>{props.details.description}</p>
      </div>
      <div className="details-footer">
        <h2 className="details-contact-info-title">Store Info</h2>
        <h1 style={{ color: '#9984F1' }}>{props.address.name}</h1>
        <h3>{props.address.formatted_address}</h3>
        {props.address.opening_hours && props.address.opening_hours.open_now ? <h5 style={{ color: 'green' }}>Open Now</h5> : <h5 style={{ color: 'red' }}>Closed</h5>}
      </div>
    </div>
  );
}
