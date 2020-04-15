import React, { Component } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import UserLocation from './UserLocation';
import * as api from '../Utils/api';
class NewMovieMap extends Component {
  state = { coordinate: null, address: null, destination: null, stops: [] };

  fetchAddress = (coordinate) => {
    api.getAddress(coordinate).then((address) => {
      this.setState({ address });
    });
  };

  addDestination = (event) => {
    event.preventDefault();
    this.setState({ destination: this.state.coordinate });
    //console.log('state coordinates', this.state.coordinate);
  };

  addStop = (event) => {
    event.preventDefault();
    // const stopsArray = [];
    // stopsArray.push(this.state.coordinate);
    this.setState({ stops: this.state.coordinate, ...this.state.stops }, () => {
      console.log(this.state.stops);
    });
  };

  displayMarkers = () => {
    return this.props.coordinates.map((coordinate, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{ lat: coordinate.lat, lng: coordinate.lng }}
          onClick={() =>
            this.setState({ coordinate }, this.fetchAddress(coordinate))
          }
        />
      );
    });
  };
  componentDidMount() {
    this.displayMarkers();
  }

  componentDidUpdate(prevProps) {
    if (this.props.coordinates !== prevProps.coordinates) this.displayMarkers();
  }

  render() {
    return (
      <div>
        <GoogleMap
          defaultZoom={6}
          defaultCenter={{ lat: 53.800739, lng: -1.549144 }}
        >
          {this.displayMarkers()}
          {this.state.coordinate && (
            <InfoWindow
              position={{
                lat: this.state.coordinate.lat,
                lng: this.state.coordinate.lng,
              }}
              onCloseClick={() => this.setState({ coordinate: null })}
            >
              <>
                <p>{this.state.address}</p>
                {!this.state.destination && (
                  <button onClick={this.addDestination}>
                    Select Destination
                  </button>
                )}
                {this.state.destination && (
                  <button onClick={this.addStop}>Add Stop</button>
                )}
              </>
            </InfoWindow>
          )}
        </GoogleMap>
        <UserLocation
          coordinates={this.props.coordinates}
          destination={this.state.destination}
        />
      </div>
    );
  }
}

const NewWrappedMap = withScriptjs(withGoogleMap(NewMovieMap));

export default NewWrappedMap;