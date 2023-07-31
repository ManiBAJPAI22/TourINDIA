import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [], // Array to store markers for police stations and hospitals
    };
  }

  handleSosButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // Perform nearby search for police stations and hospitals using Google Maps Places API
        // For now, let's just update the state with the current location
        this.setState({
          markers: [
            {
              title: 'Your Location',
              position: { lat: latitude, lng: longitude },
            },
          ],
        });
      });
    } else {
      console.log('Geolocation is not available in this browser.');
    }
  };

  render() {
    const mapStyles = {
      width: '100%',
      height: '400px',
    };

    return (
      <>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{ lat: 40.7128, lng: -74.006 }}
        >
          {/* Display markers for police stations and hospitals */}
          {this.state.markers.map((marker, index) => (
            <Marker key={index} title={marker.title} position={marker.position} />
          ))}
        </Map>
        <br />
        <SosButton onClick={this.handleSosButtonClick} />
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: '', // Replace with your actual API key
})(MapContainer);
