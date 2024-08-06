import React, { useState } from 'react';
import { API_ROUTES } from '../../../utils/constants';
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
  FormControl,
  InputLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

const ProfileDialog = ({ open, handleClose, readOnly, dataType, profileData, authToken, onUpdate }) => {
  const [editedData, setEditedData] = useState({ ...profileData });
  const [isReadOnly, setIsReadOnly] = useState(readOnly);
  const [genderOptions] = useState(['male', 'female', 'other']);
  const [notdisplayFields] = useState(['password','is_active','createdAt','updatedAt','profile_image_url']);
  const [editableFields] = useState(['user_name', 'first_name','last_name','gender','phone','alt_phone','email','profile_image_url']);

  const handleChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleEditClick = () => {
    // Enable editing when the edit icon is clicked
    if(isReadOnly){
      setIsReadOnly(false);
    }
    else{
      setIsReadOnly(true);
    }
    
  };


  const handleUpdateClick = async () => {
    try {
      // const headers = {
      //   Authorization: `Bearer ${authToken}`,
      //   'Content-Type': 'application/json',
      // };

      const apiRoute = getApiRoute();

      const response = await fetch(`${API_ROUTES.PROFILES}/${editedData.profile_id}`, {
        method: 'PUT',
       
        headers : {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        alert('Profile updated successfully'); // Simple notification using alert
        handleClose();
        onUpdate();
      } else {
        alert('Failed to update profile'); // Simple notification using alert
      }
    } catch (error) {
      alert(`Error updating profile: ${error.message}`); // Simple notification using alert
    }
  };

  const getApiRoute = () => {
    switch (dataType) {
      case 'Hospitalprofile':
        return API_ROUTES.HOSPITAL;
      case 'Doctorprofile':
        return API_ROUTES.DOCTORS;
      case 'Petownerprofile':
        return API_ROUTES.PET_OWNERS;
      default:
        return '';
    }
  };

  const handleDeleteClick = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      const apiRoute = getApiRoute();

      const response = await fetch(`${apiRoute}/disable/${editedData.id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ is_disabled: true }),
      });

      if (response.ok) {
        alert('Profile deleted successfully'); // Simple notification using alert
        handleClose();
        onUpdate();
      } else {
        alert('Failed to delete the profile'); // Simple notification using alert
      }
    } catch (error) {
      alert(`Error deleting profile: ${error.message}`); // Simple notification using alert
    }
  };

  const filteredFields = Object.keys(profileData).filter((field) => !notdisplayFields.includes(field));

  const renderField = (field) => {
    const displayName =
      field === 'date_of_birth' && dataType === 'Hospital' ? 'Date of Establishment' : field;
  
    const commonFieldStyle = { // Common style for text fields and gender Typography
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '10px',
    };
  
    if (field === 'gender' && dataType === 'Hospital') {
      return null; // Do not display gender for HospitalProfile
    }
  
    if (field === 'gender' && (dataType === 'Doctor' || dataType === 'Petowner')) {
      // Display gender drop-down for Doctorprofile and Petownerprofile
      return (
        <Grid key={field} item xs={12} md={6} sx={commonFieldStyle}>
            <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              label="Gender"
              value={editedData.gender}
              onChange={(e) => handleChange(field, e.target.value)}
              fullWidth
              disabled={isReadOnly || !editableFields.includes(field)}
              required
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Others</MenuItem>
            </Select>
            </FormControl>
        </Grid>
      );
    }
  
    return (
      <Grid key={field} item xs={12} md={6} sx={commonFieldStyle}>
        <TextField
          label={displayName
            .split('_')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ')}
          fullWidth
          value={editedData[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          disabled={isReadOnly || !editableFields.includes(field)}
        />
      </Grid>
    );
  };
  

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {isReadOnly ? 'View Profile' : 'Update Profile'}
          </Typography>
            <IconButton className='edit_profile' color="primary" onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
        </Grid>
      </DialogTitle>
      <br/>
      <DialogContent>
      <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='p'>
              Profile Picture:
              </Typography>
              {/* Adjust the image source based on your profile pic URL structure */}
              <img src={editedData.profile_image_url} alt="Profile" style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
            </Grid>
          </Grid>
          {/* Display other fields after the profile picture */}
          <Grid container spacing={2}>
            {filteredFields.map(renderField)}
          </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent="space-between">
          <Grid item>
            <IconButton color="primary" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
          {!isReadOnly && (
            <Grid item>
              <IconButton color="primary" onClick={handleUpdateClick}>
                <SaveIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleDeleteClick}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialog;
