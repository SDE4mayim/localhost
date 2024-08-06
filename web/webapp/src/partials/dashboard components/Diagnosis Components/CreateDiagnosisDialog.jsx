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


const CreateDiagnosisDialog = ({ open, handleClose, authToken }) => {
  const [owners, setOwners] = useState([]);
  const [owner_id, setOwnerId] = useState([]);
  const [pets, setPets] = useState([]);
  const [pet_id, setPetId] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [doctor_id, setDoctorId] = useState('');
  const [diagnosis_date, setVisit] = useState('');
  const [diagnosis_notes, setReason] = useState('')

  const handleChange = (field, value) => {
    switch (field) {
      case 'pet_id':
        setPetId(value);
        break;
      case 'doctor_id':
        setDoctorId(value);
        break;
      case 'diagnosis_date':
        setVisit(value);
        break;
      case 'diagnosis_notes':
        setReason(value);
        break;
      default:
        break;
    }
  };

  const handleSaveClick = async () => {
    try {
      if (!pet_id  || !doctor_id || !diagnosis_notes) {
        alert('Please fill in all required fields.');
        return;
      }
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      const appData = {
        pet_id : pet_id,
        doctor_id : doctor_id,
        diagnosis_date :Date.now(),
        diagnosis_notes : diagnosis_notes,
      };

      const response = await fetch(API_ROUTES.DIAGNOSIS, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(appData),
      });

      if (response.ok) {
        alert('Diagnosis created successfully');
        handleClose();

        // Optionally, you can fetch and update the pet data in the parent component
      } else {
        alert('Failed to create Diagnosis');
      }
    } catch (error) {
      alert(`Error creating Diagnosis: ${error.message}`);
    }
  };

  useEffect(() => {
    // Fetch pet types from the API
    const fetchPet = async () => {
      try {
        const response = await fetch(API_ROUTES.PET);
        if (response.ok) {
          const data = await response.json();
          setPets(data);
          console.log('Pets:', data);
        } else {
          console.error("Error fetching pet:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching pet:", error.message);
      }
    };
    const fetchOwners = async () => {
      try {
        const response = await fetch(API_ROUTES.PET_OWNERS);
        if (response.ok) {
          const data = await response.json();
          setOwners(data);
          console.log('owners:', data);
        } else {
          console.error("Error fetching owner:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching owner:", error.message);
      }
    };


    // Fetch owners from the API
    const fetchDoctors = async () => {
      try {
        const response = await fetch(API_ROUTES.DOCTORS);
        if (response.ok) {
          const data = await response.json();
          setDoctors(data);
          console.log('Doctors:', data);
        } else {
          console.error("Error fetching doctors:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error.message);
      }
    };

    fetchOwners();
    fetchPet();
    fetchDoctors();
  }, []); // Only fetch once on component mount

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Create Diagnosis</Typography>
          <IconButton color="primary" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} md={6c}>
            <TextField
              label="Pet Name"
              fullWidth
              value={pet_name}
              onChange={(e) => handleChange('pet_name', e.target.value)}
              required
            />
  </Grid> */}
          {/* <Grid item xs={12} md={6}>
            <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Pet <ID></ID> </InputLabel>
            <Select
              label="Pet"
              value={pet_id}
              onChange={(e) => handleChange('pet_id', e.target.value)}
              fullWidth
              required
            >
              {pet.map((pet) => (
                <MenuItem key={pet.id} value={pet.id}>
                  {owner.id} {pet.user_name}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Pet Owner</InputLabel>
            <Select
              label="Owner"
              value={owner_id}
              onChange={(e) => handleChange('owner_id', e.target.value)}
              fullWidth
              required
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
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Doctors ID </InputLabel>
            <Select
              label="Doctor"
              value={doctor_id}
              onChange={(e) => handleChange('doctor_id', e.target.value)}
              fullWidth
              required
            >
              {doctors.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  {doctor.id} {doctor.first_name} {doctor.last_name}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Pet ID </InputLabel>
            <Select
              label="Pet"
              value={pet_id}
              onChange={(e) => handleChange('pet_id', e.target.value)}
              fullWidth
              required
            >
              {pets.map((pet) => (
                <MenuItem key={pet.id} value={pet.id}>
                  {pet.id} {pet.pet_name}  
                </MenuItem>
              ))}
            </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Diagnosis Notes"
              fullWidth
              value={diagnosis_notes}
              onChange={(e) => handleChange('diagnosis_notes', e.target.value)}
              required
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

export default CreateDiagnosisDialog;