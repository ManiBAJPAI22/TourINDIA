import React, { useState } from 'react';
import countries from './assets/countries';
import typesOfVisit from './assets/TypeOfVisit';
import cityList from './assets/cities'; 
import accommodationList from './assets/accommodation';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const TouristForm = () => {
  const [nationality, setNationality] = useState('');
  const [typeOfVisit, setTypeOfVisit] = useState('');
  const [selectedCities, setSelectedCities] = useState([]);
  const [accommodation, setAccommodation] = useState('');
  const [budget, setBudget] = useState('');
  const [numAdults, setNumAdults] = useState('');
  const [numChildren, setNumChildren] = useState('');
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
    setSelectedCities(event.target.value);
  };

  const handleAccommodationChange = (event) => {
    setAccommodation(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleNumAdultsChange = (event) => {
    setNumAdults(event.target.value);
  };

  const handleNumChildrenChange = (event) => {
    setNumChildren(event.target.value);
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
      selectedCities,
      accommodation,
      budget,
      numAdults,
      numChildren,
      specialCare,
      sightseeing,
    });
  };

  return (
    <Card variant="outlined" style={{ padding: '20px' }}>
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
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
    </Card>
  );
};

export default TouristForm;
