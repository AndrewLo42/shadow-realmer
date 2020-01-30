import React from 'react';

export default function EventItem(props) {
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
        <div className="event-day">{dateFormatted}</div>
        <span className="small-text">{timeFormatted}</span>
      </div>
      <div className="event-right">
        <div className="event-title">{props.event.eventName}</div>
        <div className="store-name">{props.event.storeName}</div>
      </div>
    </div>
  );
}
