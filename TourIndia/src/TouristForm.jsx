import React, { useState } from 'react';
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
  const [nationality, setNationality] = useState('');
  const [typeOfVisit, setTypeOfVisit] = useState('');
  const [cities, setCities] = useState([]);
  const [accommodation, setAccommodation] = useState('');
  const [budget, setBudget] = useState('');
  const [specialCare, setSpecialCare] = useState({
    childCare: false,
    healthCare: false,
  });
  const [sightseeing, setSightseeing] = useState(false);

  const handleNationalityChange = (event) => {
    setNationality(event.target.value);
  };

  const handleTypeOfVisitChange = (event) => {
    setTypeOfVisit(event.target.value);
  };

  const handleCitiesChange = (event) => {
    setCities(event.target.value);
  };

  const handleAccommodationChange = (event) => {
    setAccommodation(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
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
    // You can handle the form submission or report generation here
    // For now, we will just log the form data
    console.log({
      nationality,
      typeOfVisit,
      cities,
      accommodation,
      budget,
      specialCare,
      sightseeing,
    });
  };

  return (
    <form>
      <FormControl fullWidth>
        <InputLabel>Nationality</InputLabel>
        <Select value={nationality} onChange={handleNationalityChange}>
          {/* Render the list of nationalities here */}
        </Select>
      </FormControl>
      <br />
      <FormControl fullWidth>
        <InputLabel>Type of Visit</InputLabel>
        <Select value={typeOfVisit} onChange={handleTypeOfVisitChange}>
          {/* Render the list of types of visit here */}
        </Select>
      </FormControl>
      <br />
      <FormControl fullWidth>
        <InputLabel>City/Cities you are visiting</InputLabel>
        <Select
          multiple
          value={cities}
          onChange={handleCitiesChange}
        >
          {/* Render the list of cities here */}
        </Select>
      </FormControl>
      <br />
      <FormControl fullWidth>
        <InputLabel>Accommodation Preferences</InputLabel>
        <Select value={accommodation} onChange={handleAccommodationChange}>
          {/* Render the list of accommodation preferences here */}
        </Select>
      </FormControl>
      <br />
      <FormControl fullWidth>
        <TextField
          label="Budget"
          type="number"
          value={budget}
          onChange={handleBudgetChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </FormControl>
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
            onChange={handleSpecialCareChange}
            name="healthCare"
          />
        }
        label="Health Care"
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleGenerateReport}
      >
        Generate Report
      </Button>
    </form>
  );
};

export default TouristForm;
