import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import ReportPDF from "./assets/PDFreport";
import countries from "./assets/countries";
import typesOfVisit from "./assets/TypeOfVisit";
import cityList from "./assets/cities";
import accommodationList from "./assets/accommodation";
import SosButton from "./assets/SOS";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const MapComponent = ({ google, mapCenter, mapMarkers }) => {
  return (
    <Map
      google={google}
      zoom={14}
      style={{ width: "100%", height: "400px" }}
      initialCenter={mapCenter}
      center={mapCenter}
    >
      {mapMarkers.map((marker, index) => (
        <Marker key={index} title={marker.title} position={marker.position} />
      ))}
    </Map>
  );
};

const TouristForm = ({ google }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 }); // Default center
  const [mapMarkers, setMapMarkers] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [nationality, setNationality] = useState("");
  const [typeOfVisit, setTypeOfVisit] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const [accommodation, setAccommodation] = useState("");
  const [budget, setBudget] = useState("");
  const [numAdults, setNumAdults] = useState("");
  const [numChildren, setNumChildren] = useState("");
  const [specialCare, setSpecialCare] = useState({
    childCare: false,
    healthCare: false,
    entertainment: false,
  });
  const [sightseeing, setSightseeing] = useState(false);
  const [healthCareDemands, setHealthCareDemands] = useState("");
  const [showHealthCareDemands, setShowHealthCareDemands] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [generatedReportVisible, setGeneratedReportVisible] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleNationalityChange = (event) => {
    setNationality(event.target.value);
  };

  const handleTypeOfVisitChange = (event) => {
    setTypeOfVisit(event.target.value);
  };

  const handleCitiesChange = (event) => {
    setSelectedCities(event.target.value);
  };

  const handleAccommodationChange = (event) => {
    setAccommodation(event.target.value);
  };

  const handleNumAdultsChange = (event) => {
    setNumAdults(event.target.value);
  };

  const handleNumChildrenChange = (event) => {
    setNumChildren(event.target.value);
  };

  const handleHealthCareChange = (event) => {
    const isChecked = event.target.checked;
    setSpecialCare({
      ...specialCare,
      healthCare: isChecked,
    });

    setShowHealthCareDemands(isChecked);
  };

  const handleHealthCareDemandsChange = (event) => {
    setHealthCareDemands(event.target.value);
  };

  const handleSpecialCareChange = (event) => {
    setSpecialCare({
      ...specialCare,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSightseeingChange = (event) => {
    setSightseeing(event.target.checked);
  };

  const handleGenerateReport = () => {
    const formData = {
      nationality,
      typeOfVisit,
      selectedCities,
      accommodation,
      budget,
      numAdults,
      numChildren,
      specialCare,
      sightseeing,
      healthCareDemands,
      additionalInfo,
    };

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;

          const service = new window.google.maps.places.PlacesService(
            document.createElement("div")
          );
          const request = {
            location: { lat: latitude, lng: longitude },
            radius: 5000, // Adjust radius as needed
            types: ["police", "hospital"],
          };

          service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              const markers = results.map((result) => ({
                title: result.name,
                position: result.geometry.location,
              }));

              setMapMarkers(markers);
            }
          });
        });
      } else {
        console.log("Geolocation is not available in this browser.");
      }
    }, []);

    setFormData(formData);
    fetch("http://localhost:3000/api/storeReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Show the response from the server
        setGeneratedReportVisible(true); // Show the generated report
      })
      .catch((error) => {
        console.error("Error storing report data:", error);
      });
  };

  const handleHideGeneratedReport = () => {
    setGeneratedReportVisible(false);
  };

  const handleSosButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const service = new google.maps.places.PlacesService(
          document.createElement("div")
        );
        const request = {
          location: { lat: latitude, lng: longitude },
          radius: 5000, // Adjust radius as needed
          types: ["police", "hospital"],
        };

        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const markers = results.map((result) => ({
              title: result.name,
              position: result.geometry.location,
            }));

            setMapMarkers(markers);
            setMapCenter({ lat: latitude, lng: longitude });
          }
        });
      });
    } else {
      console.log("Geolocation is not available in this browser.");
    }
    setShowMap(true);
  };

  return (
    <Card
      variant="outlined"
      sx={{ padding: "20px", maxWidth: "500px", mx: "auto" }}
    >
      <Typography variant="h5" align="center" sx={{ mb: 2 }}>
        Tourist Information Form
      </Typography>
      <form>
        <FormControl fullWidth>
          <InputLabel>Nationality</InputLabel>
          <Select value={nationality} onChange={handleNationalityChange}>
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl fullWidth>
          <InputLabel>Type of Visit</InputLabel>
          <Select value={typeOfVisit} onChange={handleTypeOfVisitChange}>
            {typesOfVisit.map((visitType) => (
              <MenuItem key={visitType} value={visitType}>
                {visitType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br /> <br />
        <FormControl fullWidth>
          <InputLabel>City/Cities you are visiting</InputLabel>
          <Select value={selectedCities} onChange={handleCitiesChange} multiple>
            {cityList.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br /> <br />
        <FormControl fullWidth>
          <InputLabel>Accommodation Preferences</InputLabel>
          <Select value={accommodation} onChange={handleAccommodationChange}>
            {accommodationList.map((accommodation) => (
              <MenuItem key={accommodation} value={accommodation}>
                {accommodation}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br /> <br />
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <FormControl fullWidth>
            <TextField
              label="Number of Adults"
              type="number"
              value={numAdults}
              onChange={handleNumAdultsChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Number of Children"
              type="number"
              value={numChildren}
              onChange={handleNumChildrenChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </div>
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={specialCare.childCare}
              onChange={handleSpecialCareChange}
              name="childCare"
            />
          }
          label="Child Care"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={specialCare.healthCare}
              onChange={handleHealthCareChange}
              name="healthCare"
            />
          }
          label="Health Care"
        />
        {showHealthCareDemands && (
          <FormControl fullWidth>
            <TextField
              label="Specific Health Care Demands"
              value={healthCareDemands}
              onChange={handleHealthCareDemandsChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        )}
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={specialCare.entertainment}
              onChange={handleSpecialCareChange}
              name="entertainment"
            />
          }
          label="Entertainment and Night life"
        />
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={sightseeing}
              onChange={handleSightseeingChange}
            />
          }
          label="Sightseeing and Activities"
        />
        <br />
        <br />
        <FormControl fullWidth>
          <TextField
            label="Anything else you wish to tell us"
            value={additionalInfo}
            onChange={(event) => setAdditionalInfo(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
      </form>
      <br />
      <br />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateReport}
        >
          Generate Report
        </Button>
      </Box>
      <br />
      <SosButton onClick={handleSosButtonClick} />
      {showMap && (
        <MapComponent
          google={google}
          mapCenter={mapCenter}
          mapMarkers={mapMarkers}
        />
      )}
      <Map
        google={google}
        zoom={14}
        style={{ width: "100%", height: "400px" }}
        initialCenter={mapCenter}
        center={mapCenter}
      >
        {mapMarkers.map((marker, index) => (
          <Marker key={index} title={marker.title} position={marker.position} />
        ))}
      </Map>
      <br />
      {generatedReportVisible && formData && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PDFDownloadLink
            document={<ReportPDF formData={formData} />}
            fileName="tourist_report.pdf"
          >
            {({ loading }) =>
              loading ? "Loading document..." : <Button>Download Report</Button>
            }
          </PDFDownloadLink>
          <br />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleHideGeneratedReport}
          >
            Close Report
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDFIzTB6xyhhBZwSLo7j4Qgn8mYBRJyU1U",
})(TouristForm);
