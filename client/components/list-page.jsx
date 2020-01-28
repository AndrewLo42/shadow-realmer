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
      this.getItems(this.props.match.path);
    }
  }

  componentDidMount() {
    this.getItems(this.props.match.path);
  }

  render() {
    const hangoutList = this.state.events.length > 0 && this.state.events.map(hangout => <ItemPage hangout={hangout} key={hangout.hangoutId} history={this.props.history} match={this.props.match} />);
    const eventList = this.state.events.length > 0 && this.state.events.map(event => <ItemPage event={event} key={event.eventId} history={this.props.history} match={this.props.match} />);
    return (
      <>
        <NavBar toggleSidebar={this.props.toggleSidebar} history={this.props.history} match={this.props.match} runSearch={this.searchByZip} placeholder="Enter Zip Code"/>
        <Title history={this.props.history} match={this.props.match} />
        <div className="event-container">
          {this.props.match.path === '/hangouts' ? hangoutList : eventList}
        </div>
      </>
    );
  }
}

function Title(props) {
  return (
    <div className="title-container">
      {props.match.path === '/hangouts' ? <div className="title">Hangouts</div> : <div className="title">Events</div>}
      <span className="add-button" onClick={() => props.history.push(`/create${props.match.path}`)}><i className="fa fa-plus"></i></span>
    </div>
  );
}
