import React from 'react';
import Map from './map';
import SRContext from './context';
import LoadingScreen from './loading-screen';

export default class EventDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,
      address: {},
      isUserRSVPed: false,
      isLoading: true
    };
    this.getDetails = this.getDetails.bind(this);
    this.rsvpForEvent = this.rsvpForEvent.bind(this);
    this.unrsvpForEvent = this.unrsvpForEvent.bind(this);
  }

  rsvpForEvent() {
    const requestBody = JSON.stringify({
      eventId: this.state.details.eventId,
      userId: this.context.user.userId
    });
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody,
      method: 'POST'
    };
    fetch('/api/eventAttendees', requestConfig)
      .then(() => this.setState(prevState => ({
        isUserRSVPed: true
      })))
      .catch(err => console.error(err));
  }

  unrsvpForEvent() {
    const requestBody = JSON.stringify({
      eventId: this.state.details.eventId,
      userId: this.context.user.userId
    });
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody,
      method: 'DELETE'
    };
    fetch('/api/eventAttendees', requestConfig)
      .then(() => this.setState(prevState => ({
        isUserRSVPed: false
      })))
      .catch(err => console.error(err));
  }

  getRSVPStatus(eventId) {
    if (this.context.user) {
      return fetch(`/api/eventAttendees?eventId=${eventId}`)
        .then(response => response.json())
        .then(eventAttendees => eventAttendees.find(attendee => attendee.userId === this.context.user.userId));
    }
    return null;
  }

  getAddress(storeName) {
    return fetch(`/api/address/?storeName=${storeName}`)
      .then(response => response.json())
      .then(addresses => addresses.results.find(store => store.name === storeName));
  }

  getDetails() {
    return fetch(`/api/events/?id=${this.props.match.params.id}`)
      .then(response => response.json());
  }

  componentDidMount() {
    this.getDetails()
      .then(details => {
        return (Promise.all([
          details,
          this.getRSVPStatus(details.eventId),
          this.getAddress(details.storeName)
        ]));
      })
      .then(result => {
        this.setState({
          details: result[0],
          isUserRSVPed: result[1],
          address: result[2],
          isLoading: false
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {

    return (
      (!this.state.isLoading && this.state.address.geometry)
        ? <EventDetails
          isUserLoggedIn={!!this.context.user}
          isUserRSVPed={this.state.isUserRSVPed}
          details={this.state.details}
          history={this.props.history}
          address={this.state.address}
          rsvpForEvent={this.rsvpForEvent}
          unrsvpForEvent={this.unrsvpForEvent} />
        : <LoadingScreen />
    );
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
  let topRightIcon = null;
  if (props.isUserLoggedIn) {
    if (props.isUserRSVPed) {
      topRightIcon = <i className="details-rsvp-icon fas fa-calendar-check" onClick={props.unrsvpForEvent}></i>;
    } else {
      topRightIcon = <i className="details-rsvp-icon fas fa-calendar" onClick={props.rsvpForEvent}></i>;
    }
  }
  return (
    <div className="details-container">
      <div className="details-header">
        <i className="fas fa-angle-double-left" onClick={() => props.history.goBack()}></i>
        <div className="details-rsvp-container" style={{ color: props.isUserRSVPed ? '#9984F1' : null }}>
          {topRightIcon}
          {props.isUserLoggedIn ? <div>RSVP</div> : null}
        </div>
      </div>
      <div className="details-map">
        {props.address.geometry && <Map zoom={14} center={props.address.geometry.location} stores={[props.address]} />}
      </div>
      <div className="details-main">
        <h1 className="details-title">{props.details.eventName}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4>{startTimeFormatted}</h4>
          <h4>{props.details.gameFormat}</h4>
        </div>
        <p>{props.details.description}</p>
        <h3 className="details-title">Fee: ${props.details.entranceFee}</h3>
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

EventDetailsPage.contextType = SRContext;
