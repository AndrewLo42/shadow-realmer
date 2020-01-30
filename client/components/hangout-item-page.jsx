import React from 'react';

export default function HangoutItem(props) {
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
