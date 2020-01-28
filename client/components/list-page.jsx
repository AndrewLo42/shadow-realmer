import React from 'react';
import NavBar from './navbar';
import ItemPage from './item-page';

export default class ListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
    this.getItems = this.getItems.bind(this);
    this.searchByZip = this.searchByZip.bind(this);
  }

  getItems(location) {
    fetch(`/api${location}/`)
      .then(data => data.json())
      .then(result => this.setState({ events: result }))
      .catch(err => console.error(err));
  }

  searchByZip(zipcode, location) {
    fetch(`/api${location}/?zipcode=${zipcode}`)
      .then(data => data.json())
      .then(result => this.setState({ events: result }))
      .catch(err => console.error(err));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.path !== this.props.match.path) {
      this.getItems(window.location.pathname);
    }
  }

  componentDidMount() {
    this.getItems(window.location.pathname);
  }

  render() {
    const hangoutList = this.state.events.length > 0 && this.state.events.map(hangout => <ItemPage hangout={hangout} key={hangout.hangoutId} history={this.props.history} />);
    const eventList = this.state.events.length > 0 && this.state.events.map(event => <ItemPage event={event} key={event.eventId} history={this.props.history} />);
    return (
      <>
        <NavBar toggleSidebar={this.props.toggleSidebar} history={this.props.history} runSearch={this.searchByZip} placeholder="Enter Zip Code"/>
        <Title history={this.props.history} match={this.props.match} />
        <div className="event-container">
          {window.location.pathname.includes('hangout') ? hangoutList : eventList}
        </div>
      </>
    );
  }
}

function Title(props) {
  return (
    <div className="title-container">
      {window.location.pathname.includes('hangout') ? <div className="title">Hangouts</div> : <div className="title">Events</div>}
      <span className="add-button" onClick={() => props.history.push(`/create${window.location.pathname}`)}><i className="fa fa-plus"></i></span>
    </div>
  );
}
