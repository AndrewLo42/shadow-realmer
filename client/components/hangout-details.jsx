import React from 'react';

export default class HangoutDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null
    };
    this.getHangoutDetails = this.getHangoutDetails.bind(this);
  }

  getHangoutDetails() {
    fetch(`/api/hangouts/?id=${this.props.match.params.id}`)
      .then(data => data.json())
      .then(result => this.setState({ details: result }))
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getHangoutDetails();
  }

  render() {
    let date = null;
    let day = null;
    let time = null;
    if (this.state.details) {
      date = new Date(this.state.details.startTime);
      day = null;
      switch (date.getDay()) {
        case 0:
          day = 'Sun';
          break;
        case 1:
          day = 'Mon';
          break;
        case 2:
          day = 'Tues';
          break;
        case 3:
          day = 'Wed';
          break;
        case 4:
          day = 'Thurs';
          break;
        case 5:
          day = 'Fri';
          break;
        case 6:
          day = 'Sat';
          break;
      }
      time = `${date.getHours()}:${date.getMinutes()}`;
    }
    return this.state.details
      ? (
        <>
          <div className="hangout-details-container">
            <div className="hangout-details-header">
              <i className="fas fa-angle-double-left" onClick={() => this.props.history.goBack()}></i>
              <i className="fas fa-poo-storm"></i>
            </div>
            <div className="hangout-details-main">
              <h1 className="hangout-details-title">{this.state.details.hangoutName}</h1>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>{day} {time}</h3>
                <h3>{this.state.details.gameFormat}</h3>
              </div>
              <p>{this.state.details.description}</p>
            </div>
            <div className="hangout-details-footer">
              <h2 className="hangout-details-contact-info-title">Contact Info</h2>
              <h4>{this.state.details.contactInfo}</h4>
            </div>
          </div>
        </>
      )
      : null;
  }
}
