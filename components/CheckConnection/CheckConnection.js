import React from "react";
import PropTypes from "prop-types";

class CheckConnection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    this.check();
  }

  check = () => {
    const isOnline = navigator.onLine;
    const interval = isOnline ? 10000 : 2000;
    if (!isOnline) {
      if (!this.state.open) this.setState({ open: true });
    } else {
      if (this.state.open) this.setState({ open: false });
    }
    // check connetion every 10 seconds
    setTimeout(() => this.check(), interval);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <React.Fragment>
        You are off-line, please check your connection...
      </React.Fragment>
    );
  }
}

export default CheckConnection;
