import React, { useState } from "react";
//import { PDFDownloadLink } from "@react-pdf/renderer";
// import ReportPDF from "./assets/PDFreport";
import SosButton from "./assets/SOS";
import countries from "./assets/countries";
import typesOfVisit from "./assets/TypeOfVisit";
import cityList from "./assets/cities";
import accommodationList from "./assets/accommodation";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const TouristForm = () => {
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
    fetch('http://localhost:3000/api/storeReport', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Show the response from the server (optional)
        setGeneratedReportVisible(true); // Show the generated report
      })
      .catch((error) => {
        console.error('Error storing report data:', error);
      });

    // Convert the form data object to a JSON string
    const formDataString = JSON.stringify(formData, null, 2);

    // Create a Blob with the form data
    const blob = new Blob([formDataString], { type: "application/json" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Open a new tab window to download the file
    const newTab = window.open(url, "_blank");

    // Release the URL object after the tab is opened
    setTimeout(() => URL.revokeObjectURL(url), 100);
    setGeneratedReportVisible(true);
  };

  const handleHideGeneratedReport = () => {
    setGeneratedReportVisible(false);
  };
  const handleSosButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // Perform nearby search for police stations and hospitals using Google Maps Places API
        // Display markers on the map for the search results

        console.log("Current Latitude:", latitude);
        console.log("Current Longitude:", longitude);
      });
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  };

  return (
    <Card variant="outlined" style={{ padding: "20px" }}>
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateReport}
      >
        Generate Report
      </Button>
      <br /> <br />
      <SosButton onClick={handleSosButtonClick} />
      <br />
      {/* {generatedReportVisible && (
        <PDFDownloadLink
          document={<ReportPDF formData={formData} />}
          fileName="tourist_report.pdf"
        >
          {({ loading }) =>
            loading ? "Loading document..." : <Button>"Download now!"</Button>
          }
        </PDFDownloadLink>
      )}
      {generatedReportVisible && (
        <Button

          variant="contained"
          color="secondary"
          onClick={handleHideGeneratedReport}
        >
          Close Report
        </Button>
      )} */}
    </Card>
  );
};

export default TouristForm;
