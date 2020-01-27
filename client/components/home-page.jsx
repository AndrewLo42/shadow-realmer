import React from 'react';
import SearchBar from './search-bar';

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
          <SearchBar toggleSidebar={this.props.toggleSidebar} history={this.props.history} placeholder="Yee Dawg" />
          <div className="home-container">
            <div className="home-main-title">Welcome to Shadow Realmer</div>
            <div className="home-main-subtitle">Your one-stop shop for finding trading card meetups.</div>
            <div className="home-events-title">Events</div>
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
                        <h2>{event.eventName}</h2>
                        <h3>{startTimeFormatted}</h3>
                        <p>{event.description}</p>
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
