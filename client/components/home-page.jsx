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
          <div className="title">Events</div>
          <div className="home-events-carousel-container">
            <div className="home-events-carousel">
              {this.state.events.map(event => {
                const startTime = new Date(event.startTime);
                // const startTimeMonth = startTime.getMonth() + 1;
                const dateTimeFormatOptions = {
                  month: 'short',
                  day: 'numeric',
                  hour12: true,
                  hour: 'numeric',
                  minute: 'numeric'
                };
                const startTimeFormatted = new Intl.DateTimeFormat('en-US', dateTimeFormatOptions).format(startTime);
                return (
                  <div className="home-events-carousel-item-container" key={event.eventId}>
                    <div className="home-events-carousel-item">
                      <div className="event-placeholder-image" style={{
                        backgroundColor: 'red',
                        width: 300,
                        height: 200
                      }}></div>
                      <h2>{event.eventName}</h2>
                      <h3>{startTimeFormatted}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="title">Hangouts</div>
          <div className="home-hangouts-list">

          </div>
        </>
      );
  }
}
