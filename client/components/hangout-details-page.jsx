import React from 'react';
import Map from './map';

export default class HangoutDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,
      center: {}
    };
    this.getDetails = this.getDetails.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.whichView = this.whichView.bind(this);
  }

  getDetails() {
    fetch(`/api/hangouts/?id=${this.props.match.params.id}`)
      .then(data => data.json())
      .then(result => this.setState({ details: result }))
      .then(() => this.getLocation())
      .catch(err => console.error(err));
  }

  getLocation() {
    fetch(`/api/zipcode/?zipcode=${this.state.details.zipcode}`)
      .then(data => data.json())
      .then(result => this.setState({ center: result.results[0].geometry.location }))
      .catch(err => console.error(err));
  }

  whichView() {
    if (this.state.details && Object.keys(this.state.center).length !== 0) {
      return <HangoutDetails details={this.state.details} history={this.props.history} center={this.state.center} />;
    }
    return <div className="title">Loading...</div>;
  }

  componentDidMount() {
    this.getDetails();
  }

  render() {
    return this.whichView();
  }
}

function HangoutDetails(props) {
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
      </div>
      <div className="details-map">
        {props.center && <Map zoom={13} center={props.center} />}
      </div>
      <div className="details-main">
        <h1 className="details-title">{props.details.hangoutName}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>{ startTimeFormatted }</h3>
          <h3>{props.details.gameFormat}</h3>
        </div>
        <p>{props.details.description}</p>
      </div>
      <div className="details-footer">
        <h2 className="details-contact-info-title">Contact Info</h2>
        <h4>{props.details.contactInfo}</h4>
      </div>
    </div>
  );
}
