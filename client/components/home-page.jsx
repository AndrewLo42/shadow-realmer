import React from 'react';
import NavBar from './search-bar';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      hangouts: []
    };
  }

  componentDidMount() {
    fetch('/api/events?amount=5')
      .then(data => data.json())
      .then(events => {
        this.setState({ events });
      });

    fetch('/api/hangouts?amount=5')
      .then(data => data.json())
      .then(hangouts => {
        this.setState({ hangouts });
      });
  }

  render() {
    const haveEventsLoaded = this.state.events.length !== 0;
    const haveHangoutsLoaded = this.state.hangouts !== 0;
    return haveEventsLoaded && haveHangoutsLoaded &&
      (
        <>
          <NavBar {...this.props} placeholder="Yee Dawg" />
          <div className="home-container">
            <div className="title">Events</div>
            <div className="home-events-carousel-container">
              <div className="home-events-carousel">
                {this.state.events.map(event => {
                  const startTime = new Date(event.startTime);
                  const dateTimeFormatOptions = {
                    month: 'short',
                    day: 'numeric',
                    hour12: true,
                    hour: 'numeric',
                    minute: 'numeric'
                  };
                  const startTimeFormatted = new Intl.DateTimeFormat('en-US', dateTimeFormatOptions).format(startTime);
                  return (
                    <div
                      className="home-events-carousel-item-container"
                      key={event.eventId}
                      onClick={() => this.props.history.push(`/events/${event.eventId}`)}>
                      <div className="home-events-carousel-item">
                        <h2>{event.eventName.slice(1, -1)}</h2>
                        <h4>{startTimeFormatted}</h4>
                        <p>{event.description.slice(1, -1)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="home-hangouts-title">Hangouts</div>
            <div className="home-hangouts-list">
              {this.state.hangouts.map(hangout => {
                return (
                  <div
                    className="home-hangouts-list-item"
                    key={hangout.hangoutId}
                    onClick={() => this.props.history.push(`/hangouts/${hangout.hangoutId}`)}>
                    {hangout.hangoutName}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      );
  }
}
