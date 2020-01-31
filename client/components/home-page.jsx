import React from 'react';
import NavBar from './navbar';
import SRContext from './context';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      hangouts: []
    };
  }

  componentDidMount() {
    this.parseTime('09', '30', '02', '00', 'PM');
    fetch('/api/events?amount=3')
      .then(data => data.json())
      .then(events => {
        this.setState({ events });
      });

    fetch('/api/hangouts?amount=4')
      .then(data => data.json())
      .then(hangouts => {
        this.setState({ hangouts });
      });
  }

  parseTime(month, day, hour, minute, ampm) {
    if (hour === '12') {
      hour = '00';
    }
    if (ampm === 'PM') {
      hour = parseInt(hour, 10) + 12;
    }
    const date = new Date(
      new Date().getFullYear(),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute)
    );
      // eslint-disable-next-line no-console
    console.log('date: ', date);
    // eslint-disable-next-line no-console
    console.log('date-UTC: ', date.toUTCString());
    const time = Date.parse(date);
    // eslint-disable-next-line no-console
    console.log('time: ', time);
    const offset = date.getTimezoneOffset() * 60000;
    // eslint-disable-next-line no-console
    console.log('offset, ', offset);
    const result = new Date(time + offset);
    // eslint-disable-next-line no-console
    console.log('result: ', result);
    // eslint-disable-next-line no-console
    console.log(result.toISOString());
  }

  render() {
    const haveEventsLoaded = this.state.events.length !== 0;
    const haveHangoutsLoaded = this.state.hangouts !== 0;
    return haveEventsLoaded && haveHangoutsLoaded &&
      (
        <>
          <NavBar {...this.props} />
          <div className="home-container">
            <div className="home-greeting">
              <h2>Welcome to Shadow Realmer</h2>
              <p>Hangout with both new and old friends. Find local TCG stores in your area and events that they are hosting. Remember to believe in the heart of the cards!</p>
            </div>
            <div className="home-title">Quick Events</div>
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
                  const gameType = event.gameId === 1 ? 'Magic: The Gathering' : 'Yu-Gi-Oh';
                  return (
                    <div
                      className="home-events-carousel-item-container"
                      key={event.eventId}
                      onClick={() => this.props.history.push(`/events/${event.eventId}`)}>
                      <div className="home-events-carousel-item">
                        <h2>{event.eventName}</h2>
                        <h4>{startTimeFormatted}</h4>
                        <p>{`${gameType} – ${event.gameFormat}`}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="home-title">Quick Hangouts</div>
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

HomePage.contextType = SRContext;
