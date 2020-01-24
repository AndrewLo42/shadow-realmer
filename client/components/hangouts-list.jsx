import React from 'react';
import SearchBar from './search-bar';
import HangoutItem from './hangout-item';

class HangoutsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hangouts: []
    };
    this.getHangouts = this.getHangouts.bind(this);
  }

  getHangouts() {
    fetch('/api/hangouts/')
      .then(data => data.json())
      .then(result => this.setState({ hangouts: result }))
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getHangouts();
  }

  render() {
    const hangoutTest = this.state.hangouts.length > 0 ? this.state.hangouts.map(hangout => <HangoutItem hangout={hangout} key={hangout.hangoutId} />) : null;
    return (
      <>
        <SearchBar placeholder="Enter Zipcode"/>
        <div className="event-container">
          {hangoutTest}
        </div>
      </>
    );
  }
}

export default HangoutsList;
