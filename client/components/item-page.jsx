import React from 'react';

export default function ItemPage(props) {
  return props.match.path.includes('/hangouts') ? <HangoutItem hangout={props.hangout} history={props.history} /> : <EventItem event={props.event} history={props.history} />;
}

function HangoutItem(props) {
  const icon = props.hangout.gameFormat === 'Yu-Gi-Oh' ? '/images/yugioh.png' : '/images/mtg.png';
  const date = new Date(props.hangout.startTime);
  const day = dayOfWeek(date);
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
  const day = dayOfWeek(date);
  const month = whichMonth(date);
  const time = `${date.getHours()}:${date.getMinutes()}`;
  return (
    <div className="event" onClick={() => props.history.push(`/events/${props.event.eventId}`)}>
      <div className="event-left">
        <div className="event-day">{month} {date.getDate()}</div>
        <span className="small-text">{day} {time}</span>
      </div>
      <div className="event-right">
        <div className="event-title">{props.event.eventName}</div>
        <div className="store-name">{props.event.storeName}</div>
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

function whichMonth(date) {
  switch (date.getMonth()) {
    case 0:
      return 'Jan';
    case 1:
      return 'Feb';
    case 2:
      return 'Mar';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'Jun';
    case 6:
      return 'Jul';
    case 7:
      return 'Aug';
    case 8:
      return 'Sept';
    case 9:
      return 'Oct';
    case 10:
      return 'Nov';
    case 11:
      return 'Dec';
    default:
      return 'Unknown';
  }
}
