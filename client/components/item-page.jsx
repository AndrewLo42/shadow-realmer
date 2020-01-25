import React from 'react';

export default function ItemPage(props) {
  return props.match.path.includes('/hangouts') ? <HangoutItem hangout={props.hangout} history={props.history} /> : <EventItem event={props.event} history={props.history} />;
}

function HangoutItem(props) {
  const icon = props.hangout.gameFormat === 'Yu-Gi-Oh' ? '/images/yugioh.png' : '/images/mtg.png';
  const date = new Date(props.hangout.startTime);
  let day = null;
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
    default:
      day = 'Unknown';
  }
  const time = `${date.getHours()}:${date.getMinutes()}`;
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
          <span>{day} {time}</span>
          <span>{props.hangout.gameFormat}</span>
        </div>
      </div>
    </div>
  );
}

function EventItem(props) {
  const date = new Date(props.event.startTime);
  let day = null;
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
    default:
      day = 'Unknown';
  }
  const time = `${date.getHours()}:${date.getMinutes()}`;
  return (
    <div className="event" onClick={() => props.history.push(`/events/${props.event.eventId}`)}>
      <div className="event-left">
        <div className="event-icon-container">
        </div>
      </div>
      <div className="event-right">
        <div className="event-name">
          <div>{props.event.eventName}</div>
        </div>
        <div className="small-text event-spec">
          <span>{day} {time}</span>
          <span>{props.event.gameFormat}</span>
        </div>
      </div>
    </div>
  );
}
