import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class ViewTogglerInfo extends Component {
  state = { isVisible: false };

  handleClick = (event) => {
    this.setState((currentState) => {
      return { isVisible: !currentState.isVisible };
    });
  };
  render() {
    return (
      <>
        <Button
          variant="contained"
          id="movie-info-search"
          onClick={this.handleClick}
        >
          {this.state.isVisible ? 'Hide movie info' : 'Show movie info'}
        </Button>
        {this.state.isVisible && this.props.children}
      </>
    );
  }
}

export default ViewTogglerInfo;
