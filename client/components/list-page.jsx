import React from 'react';
import NavBar from './navbar';
import { HangoutItem, EventItem } from './item-page';
import { SRContext } from './context';

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
      this.setState({ events: [] });
      this.getItems(window.location.pathname);
    }
  }

  componentDidMount() {
    this.getItems(window.location.pathname);
  }

  render() {
    const list = this.state.events.length && window.location.pathname.includes('hangout')
      ? this.state.events.map(hangout => <HangoutItem hangout={hangout} key={hangout.hangoutId} history={this.props.history} />)
      : this.state.events.map(event => <EventItem event={event} key={event.eventId} history={this.props.history} />);
    return (
      <>
        <NavBar history={this.props.history} runSearch={window.location.pathname.includes('hangout') ? this.searchByZip : this.searchForEvents} />
        <Title history={this.props.history} showAll={this.state.showAll} getAll={this.getItems} amountOfEvents={this.state.events.length} />
        <div className="event-container">
          { list }
        </div>
      </>
    );
  }
}

function Title(props) {
  return (
    <SRContext.Consumer>{context => {
      return (
        <>
          <div className="title-container">
            <span className={`back-button ${props.showAll && 'hidden'}`} onClick={() => props.getAll(window.location.pathname)}><i className="fa fa-angle-left"></i></span>
            {window.location.pathname.includes('hangout') ? <div className="title">Hangouts</div> : <div className="title">Events</div>}
            <span className={`add-button ${!context.user && 'hidden'}`} onClick={() => props.history.push(`/create${window.location.pathname}`)}><i className="fa fa-plus"></i></span>
          </div>
          <div className="amount-of-events">Showing {props.amountOfEvents} Events</div>
        </>
      );
    }}
    </SRContext.Consumer>
  );
}
