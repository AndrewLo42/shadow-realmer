import React from 'react';
import NavBar from './navbar';
import ItemPage from './item-page';

export default class ListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      showAll: true
    };
    this.getItems = this.getItems.bind(this);
    this.searchByZip = this.searchByZip.bind(this);
    this.searchForEvents = this.searchForEvents.bind(this);
  }

  getItems(location) {
    fetch(`/api${location}/`)
      .then(data => data.json())
      .then(result => this.setState({ events: result, showAll: true }))
      .catch(err => console.error(err));
  }

  searchByZip(zipcode) {
    fetch(`/api/hangouts/?zipcode=${zipcode}`)
      .then(data => data.json())
      .then(result => this.setState({ events: result, showAll: false }))
      .catch(err => console.error(err));
  }

  searchForEvents(zipcode) {
    fetch(`/api/search/?zipcode=${zipcode}`)
      .then(data => data.json())
      .then(result => {
        const storeNamesFromGoogle = result.results.map(storeName => storeName.name);
        return this.state.events.filter(event => {
          return storeNamesFromGoogle.includes(event.storeName);
        });
      })
      .then(data => this.setState({ events: data, showAll: false }))
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
    const hangoutList = this.state.events.length && this.state.events.map(hangout => <ItemPage hangout={hangout} key={hangout.hangoutId} history={this.props.history} />);
    const eventList = this.state.events.length && this.state.events.map(event => <ItemPage event={event} key={event.eventId} history={this.props.history} />);
    return (
      <>
        <NavBar toggleSidebar={this.props.toggleSidebar} history={this.props.history} runSearch={window.location.pathname.includes('hangout') ? this.searchByZip : this.searchForEvents} placeholder="Enter Zip Code"/>
        <Title history={this.props.history} showAll={this.state.showAll} getAll={this.getItems} amountOfEvents={this.state.events.length} />
        <div className="event-container">
          {window.location.pathname.includes('hangout') ? hangoutList : eventList}
        </div>
      </>
    );
  }
}

function Title(props) {
  return (
    <>
      <div className="title-container">
        <span className={`back-button ${props.showAll && 'hidden'}`} onClick={() => props.getAll(window.location.pathname)}><i className="fa fa-angle-left"></i></span>
        {window.location.pathname.includes('hangout') ? <div className="title">Hangouts</div> : <div className="title">Events</div>}
        <span className="add-button" onClick={() => props.history.push(`/create${window.location.pathname}`)}><i className="fa fa-plus"></i></span>
      </div>
      <div className="amount-of-events">Showing {props.amountOfEvents} Events</div>
    </>
  );
}
