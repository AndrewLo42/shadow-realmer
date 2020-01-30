import React from 'react';

export const SRContext = React.createContext();

export default class SRProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showSidebar: false,
      toggleSidebar: () => (this.setState({ showSidebar: !this.state.showSidebar }))
    };
  }

  render() {
    return (
      <SRContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </SRContext.Provider>
    );
  }
}
