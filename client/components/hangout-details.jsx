import React from 'react';

export default class HangoutDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null
    };
  }

  componentDidMount() {
    // Note: Receiving id from parent (could be <App> or <HangoutsList>)
    // TODO: Make fetch request that grabs data from
    this.setState({
      details: {
        title: 'Title of Event',
        dayOfWeek: 'Fri',
        time: '2:00PM',
        format: 'Modern',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam feugiat, ante in aliquet viverra, augue risus hendrerit eros, non sagittis libero risus in eros. Donec mollis nec nulla ut scelerisque. Sed nec nibh nec tortor egestas laoreet nec quis nisi. Quisque eget consectetur quam, sit amet tempor nisl. Curabitur semper tortor sed magna sollicitudin dapibus. In non molestie est. Maecenas eget viverra odio. Donec scelerisque arcu dolor, quis blandit ipsum interdum non.'
      }
    });
  }

  render() {
    return this.state.details
      ? (
        <div className="hangout-details-container">
          <div className="hangout-details-header">
            <i className="fas fa-angle-double-left"></i>
            <i className="fas fa-poo-storm"></i>
          </div>
          <div className="hangout-details-main">
            <h1>{this.state.details.title}</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{}</h3>
            </div>
          </div>
          <div className="hangout-details-footer">

          </div>
        </div>
      )
      : null;
  }
}
