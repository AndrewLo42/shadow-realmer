import React, { useState, useEffect } from 'react';
import NavBar from './navbar';

export default function HomePage(props) {
  const [eventsList, setEventsList] = useState([]);
  const [hangoutsList, setHangoutsList] = useState([]);

  useEffect(() => {
    fetch('/api/events?amount=3')
      .then(data => data.json())
      .then(events => {
        setEventsList(events);
      });

    fetch('/api/hangouts?amount=4')
      .then(data => data.json())
      .then(hangouts => {
        setHangoutsList(hangouts);
      });
  }, []);

  const haveEventsLoaded = eventsList !== 0;
  const haveHangoutsLoaded = hangoutsList !== 0;
  return haveEventsLoaded && haveHangoutsLoaded &&
    (
      <>
        <NavBar {...props} />
        <div className="home-container">
          <div className="home-greeting">
            <h2>Welcome to Shadow Realmer</h2>
            <p>Hangout with both new and old friends. Find local TCG stores in your area and events that they are hosting. Remember to believe in the heart of the cards!</p>
          </div>
          <div className="home-title">Quick Events</div>
          <div className="home-events-carousel-container">
            <div className="home-events-carousel">
              {eventsList.map(event => {
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
                    onClick={() => props.history.push(`/events/${event.eventId}`)}>
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
            {hangoutsList.map(hangout => {
              return (
                <div
                  className="home-hangouts-list-item"
                  key={hangout.hangoutId}
                  onClick={() => props.history.push(`/hangouts/${hangout.hangoutId}`)}>
                  {hangout.hangoutName}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
}
