// import React, { Component } from "react";
// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

// class MapContainer extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       markers: [], // Array to store markers for police stations and hospitals
//     };
//   }

//   handleSosButtonClick = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;

//         // Perform nearby search for police stations
//         const policeStationsRequest = {
//           location: { lat: latitude, lng: longitude },
//           radius: 5000, // Adjust radius as needed
//           type: "police",
//         };

//         // Perform nearby search for hospitals
//         const hospitalsRequest = {
//           location: { lat: latitude, lng: longitude },
//           radius: 5000, // Adjust radius as needed
//           type: "hospital",
//         };

//         // Initialize the PlacesService
//         const service = new this.props.google.maps.places.PlacesService(
//           this.refs.map
//         );

//         // Make requests for police stations and hospitals
//         service.nearbySearch(
//           policeStationsRequest,
//           (policeStationsResults, policeStationsStatus) => {
//             service.nearbySearch(
//               hospitalsRequest,
//               (hospitalsResults, hospitalsStatus) => {
//                 if (
//                   policeStationsStatus ===
//                     window.google.maps.places.PlacesServiceStatus.OK &&
//                   hospitalsStatus ===
//                     window.google.maps.places.PlacesServiceStatus.OK
//                 ) {
//                   const policeMarkers = policeStationsResults.map((result) => ({
//                     title: result.name,
//                     position: result.geometry.location,
//                   }));

//                   const hospitalMarkers = hospitalsResults.map((result) => ({
//                     title: result.name,
//                     position: result.geometry.location,
//                   }));

//                   const allMarkers = [...policeMarkers, ...hospitalMarkers];

//                   this.setState({
//                     markers: [
//                       ...allMarkers,
//                       {
//                         title: "Your Location",
//                         position: { lat: latitude, lng: longitude },
//                       },
//                     ],
//                   });
//                 }
//               }
//             );
//           }
//         );
//       });
//     } else {
//       console.log("Geolocation is not available in this browser.");
//     }
//   };

//   render() {
//     const mapStyles = {
//       width: "100%",
//       height: "400px",
//     };

//     return (
//       <>
//         <Map
//           google={this.props.google}
//           zoom={14}
//           style={mapStyles}
//           initialCenter={{ lat: 40.7128, lng: -74.006 }}
//           ref="map"
//         >
//           {/* Display markers for police stations, hospitals, and user location */}
//           {this.state.markers.map((marker, index) => (
//             <Marker
//               key={index}
//               title={marker.title}
//               position={marker.position}
//             />
//           ))}
//         </Map>
//         <br />
//         <button onClick={this.handleSosButtonClick}>SOS</button>
//       </>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyA7t7Diwvp6KdhZ9D2qzOf-AFfOPWzqlVc",
// })(MapContainer);
