import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '400px',
};

class MapContainer extends Component {
  state = {
    markers: [], // To store the markers for police stations and hospitals
  };

  // Function to perform the nearby search for police stations and hospitals
  performNearbySearch = (lat, lng) => {
    const { google } = this.props;
    const service = new google.maps.places.PlacesService(this.map);
    
    // Perform nearby search for police stations
    service.nearbySearch(
      {
        location: { lat, lng },
        radius: 5000, // Search within 5km radius
        type: 'police',
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // Add police station markers to the state
          this.setState((prevState) => ({
            markers: [...prevState.markers, ...results],
          }));
        }
      }
    );

    // Perform nearby search for hospitals
    service.nearbySearch(
      {
        location: { lat, lng },
        radius: 5000, // Search within 5km radius
        type: 'hospital',
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // Add hospital markers to the state
          this.setState((prevState) => ({
            markers: [...prevState.markers, ...results],
          }));
        }
      }
    );
  };

  // Function to get the user's current location
  getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.performNearbySearch(latitude, longitude);
        },
        (error) => {
          console.log('Error getting current location:', error);
        }
      );
    } else {
      console.log('Geolocation is not available in this browser.');
    }
  };

  componentDidMount() {
    // Get user's current location and perform nearby search on mount
    this.getCurrentLocation();
  }

  render() {
    const { markers } = this.state;

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{ lat: 0, lng: 0 }} // Centered at (0, 0) by default, will be updated to user's location
        onReady={(mapProps, map) => {
          this.map = map; // Save the map reference
        }}
      >
        {/* Render the markers on the map */}
        {markers.map((marker) => (
          <Marker
            key={marker.place_id}
            position={{ lat: marker.geometry.location.lat(), lng: marker.geometry.location.lng() }}
            name={marker.name}
          />
        ))}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: AIzaSyA7t7Diwvp6KdhZ9D2qzOf-AFfOPWzqlVc, // Replace with your actual API key
})(MapContainer);
