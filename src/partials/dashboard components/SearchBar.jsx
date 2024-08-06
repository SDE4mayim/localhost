import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

const SearchBar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('hospitalId'); // Default search type

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleButtonClick = () => {
    handleSearch({ searchType, searchQuery });
  };

  return (
    <Grid container spacing={2} alignItems="center" style={{ display: 'flex', justifyContent: 'center' }}>
      <Grid item>
        <TextField
          id="search"
          label="Search by username"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <FormControl component="fieldset">
          <RadioGroup
            row
            value={searchType}
            onChange={handleSearchTypeChange}
          >
            <FormControlLabel value="username" control={<Radio />} label="Username" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleButtonClick}>
          Search
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleButtonClick}>
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;