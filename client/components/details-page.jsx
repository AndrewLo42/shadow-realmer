import React from 'react';

export default class DetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null
    };
    this.getDetails = this.getDetails.bind(this);
  }

  getDetails() {
    const location = this.props.match.path.includes('hangout') ? '/hangouts' : '/events';
    fetch(`/api${location}/?id=${this.props.match.params.id}`)
      .then(data => data.json())
      .then(result => this.setState({ details: result }))
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getDetails();
  }

  render() {
    return this.state.details
      ? (this.props.match.path.includes('hangout') ? <HangoutDetails details={this.state.details} history={this.props.history} /> : <EventDetails details={this.state.details} history={this.props.history} />) : null;
  }
}

function HangoutDetails(props) {
  const date = new Date(props.details.startTime);
  const day = dayOfWeek(date);
  const time = `${date.getHours()}:${date.getMinutes()}`;
  return (
    <div className="details-container">
      <div className="details-header">
        <i className="fas fa-angle-double-left" onClick={() => props.history.goBack()}></i>
        <i className="fas fa-poo-storm"></i>
      </div>
      <div className="details-main">
        <h1 className="details-title">{props.details.hangoutName}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>{day} {time}</h3>
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

function EventDetails(props) {
  const date = new Date(props.details.startTime);
  const day = dayOfWeek(date);
  const time = `${date.getHours()}:${date.getMinutes()}`;
  return (
    <div className="details-container">
      <div className="details-header">
        <i className="fas fa-angle-double-left" onClick={() => props.history.goBack()}></i>
        <i className="fas fa-poo-storm"></i>
      </div>
      <div className="details-main">
        <h1 className="details-title">{props.details.hangoutName}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3>{day} {time}</h3>
          <h3>{props.details.gameFormat}</h3>
        </div>
        <p>{props.details.description}</p>
      </div>
      <div className="details-footer">
        <h2 className="details-contact-info-title">Store Info</h2>
        <h4>{props.details.contactInfo}</h4>
      </div>
    </div>
  );
}

function dayOfWeek(date) {
  switch (date.getDay()) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tues';
    case 3:
      return 'Wed';
    case 4:
      return 'Thurs';
    case 5:
      return 'Fri';
    case 6:
      return 'Sat';
    default:
      return 'Unknown';
  }
}
