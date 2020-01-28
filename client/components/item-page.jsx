import React from 'react';

export default function ItemPage(props) {
  return window.location.pathname.includes('/hangouts') ? <HangoutItem hangout={props.hangout} history={props.history} /> : <EventItem event={props.event} history={props.history} />;
}

function HangoutItem(props) {
  const icon = props.hangout.gameFormat === 'Yu-Gi-Oh' ? '/images/yugioh.png' : '/images/mtg.png';
  const date = new Date(props.hangout.startTime);
  const dateFormatOptions = {
    month: 'short',
    weekday: 'short',
    day: 'numeric'
  };
  const dateFormatted = new Intl.DateTimeFormat('en-US', dateFormatOptions).format(date);
  return (
    <div className="event" onClick={() => props.history.push(`/hangouts/${props.hangout.hangoutId}`)}>
      <div className="event-left">
        <div className="event-icon-container">
          <img src={icon} alt="game-type" className="event-icon"></img>
        </div>
      </div>
      <div className="event-right">
        <div className="event-name">
          <div>{props.hangout.hangoutName}</div>
        </div>
        <div className="small-text hangout-spec">
          <span>{ dateFormatted }</span>
          <span>{props.hangout.gameFormat}</span>
        </div>
      </div>
    </div>
  );
}

function EventItem(props) {
  const date = new Date(props.event.startTime);
  const dateFormatOptions = {
    month: 'short',
    day: 'numeric'
  };
  const dateFormatted = new Intl.DateTimeFormat('en-US', dateFormatOptions).format(date);
  const timeFormatOptions = {
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    weekday: 'short'
  };
  const timeFormatted = new Intl.DateTimeFormat('en-US', timeFormatOptions).format(date);
  return (
    <div className="event" onClick={() => props.history.push(`/events/${props.event.eventId}`)}>
      <div className="event-left">
        <div className="event-day">{ dateFormatted }</div>
        <span className="small-text">{ timeFormatted }</span>
      </div>
      <div className="event-right">
        <div className="event-title">{props.event.eventName}</div>
        <div className="store-name">{props.event.storeName}</div>
      </div>
    </div>
  );
}
