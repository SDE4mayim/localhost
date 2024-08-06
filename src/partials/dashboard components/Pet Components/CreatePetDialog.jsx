import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Select,
  Grid,
  IconButton,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import API_ROUTES from '../../../utils/constants';

const CreatePetDialog = ({ open, handleClose, authToken }) => {
  const [pet_name, setPetName] = useState('');
  const [petTypeData, setPetTypeData] = useState([]);
  const [owners, setOwners] = useState([]);
  const [selectedPetType, setSelectedPetType] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [owner_id, setOwnerId] = useState('');
  const [last_vet_visit, setLastVetVisit] = useState('');
  const [next_vet_visit, setNextVetVisit] = useState('');
  const [food_brand, setFoodBrand] = useState('');
  const [food_type, setFoodType] = useState('');
  const [food_amount, setFoodAmount] = useState('');

  const handleChange = (field, value) => {
    switch (field) {
      case 'pet_name':
        setPetName(value);
        break;
      case 'pet_type':
        setSelectedPetType(value);
        break;
      case 'gender':
        setGender(value);
        break;
      case 'age':
        setAge(value);
        break;
      case 'weight':
        setWeight(value);
        break;
      case 'owner_id':
        setOwnerId(value);
        break;
      case 'last_vet_visit':
        setLastVetVisit(value);
        break;
      case 'next_vet_visit':
        setNextVetVisit(value);
        break;
      case 'food_brand':
        setFoodBrand(value);
        break;
      case 'food_type':
        setFoodType(value);
        break;
      case 'food_amount':
        setFoodAmount(value);
        break;
      default:
        break;
    }
  };

  const handlePetTypeChange = (event) => {
    setSelectedPetType(event.target.value);
  };

  const handleSaveClick = async () => {
    try {
      
      if (!pet_name) {
        alert('Please fill pet name.');
        return;
      }
      if (!gender) {
        alert('Please fill gender.');
        return;
      }
      const duplicatePet = pets.find(pet => pet.pet_name === pet_name && pet.owner_id === owner_id);
      if (duplicatePet) {
        alert('Pet with this name and owner already exists.');
        return;
      }
      if (!age) {
        alert('Please fill age.');
        return;
      }
      if (!weight) {
        alert('Please fill weight.');
        return;
      }
      if (!owner_id ) {
        alert('Please fill owner id.');
        return;
      }
      if ( !food_brand) {
        alert('Please fill food brand.');
        return;
      }
      if (!food_type) {
        alert('Please fillfood type.');
        return;
      }
      if ( !food_amount) {
        alert('Please fill the food amount.');
        return;
      }

      

      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };


      const petData = {
        pet_name,
        pet_type_id: selectedPetType,
        gender,
        age,
        weight,
        owner_id,
        last_vet_visit ,
        next_vet_visit,
        food_brand,
        food_type,
        food_amount,
      };

      const response = await fetch(API_ROUTES.PET, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(petData),
      });

      
      if (response.ok) {
        alert('Pet created successfully');
        handleClose();

        // Optionally, you can fetch and update the pet data in the parent component
      } else {
        alert('Failed to create pet');
      }
    } catch (error) {
      alert(`Error creating pet: ${error.message}`);
    }
  };
  
  let nameCheck = pet_name.target.value;
  console.log("nameCheck");

  useEffect(() => {
    // Fetch pet types from the API
    const fetchPetTypes = async () => {
      try {
        const response = await fetch(API_ROUTES.PET_TYPE);
        if (response.ok) {
          const data = await response.json();
          setPetTypeData(data);
        } else {
          console.error("Error fetching pet types:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching pet types:", error.message);
      }
    };


    // Fetch owners from the API
    const fetchOwners = async () => {
      try {
        const response = await fetch(API_ROUTES.PET_OWNERS);
        if (response.ok) {
          const data = await response.json();
          setOwners(data);
          console.log('Owners:', data);
        } else {
          console.error("Error fetching owners:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching owners:", error.message);
      }
    };

    fetchPetTypes();
    fetchOwners();
  }, []); // Only fetch once on component mount

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Create Pet</Typography>
          <IconButton color="primary" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Pet Name"
              fullWidth
              value={pet_name}
              onChange={(e) => handleChange('pet_name', e.target.value)}
             
            />
          </Grid>
          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Pet Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              label="Pet Type"
              id="petType"
              value={selectedPetType}
              onChange={handlePetTypeChange}
              fullWidth
              
            >
              {Array.isArray(petTypeData) && petTypeData.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {`${type.id}-${type.pet_type}-${type.breed}`}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              label="Gender"
              value={gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              fullWidth
              
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Others</MenuItem>
            </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Age"
              fullWidth
              value={age}
              onChange={(e) => handleChange('age', e.target.value)}
              
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Weight"
              fullWidth
              value={weight}
              onChange={(e) => handleChange('weight', e.target.value)}
             
            />
          </Grid>
          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Pet Owner</InputLabel>
            <Select
              label="Owner"
              value={owner_id}
              onChange={(e) => handleChange('owner_id', e.target.value)}
              fullWidth
              
            >
              {owners.map((owner) => (
                <MenuItem key={owner.id} value={owner.id}>
                  {owner.id} {owner.user_name}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Food Brand"
              fullWidth
              value={food_brand}
              onChange={(e) => handleChange('food_brand', e.target.value)}
             
            />
          </Grid>
          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Food Type</InputLabel>
            <Select
              label="Food Type"
              value={food_type}
              onChange={(e) => handleChange('food_type', e.target.value)}
              fullWidth
              
            >
              <MenuItem value="raw">Raw</MenuItem>
              <MenuItem value="wet">Wet</MenuItem>
              <MenuItem value="dry">Dry</MenuItem>
            </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Food Amount"
              fullWidth
              value={food_amount}
              onChange={(e) => handleChange('food_amount', e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveClick} startIcon={<SaveIcon />} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
    
  );
};

export default CreatePetDialog;
