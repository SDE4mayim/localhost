// PetDialog.jsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Grid,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_ROUTES } from '../../../utils/constants';

const PetDialog = ({ open, handleClose, petData, authToken, onUpdate }) => {
  const [editedPetData, setEditedPetData] = useState({ ...petData });
  const [isReadOnly, setIsReadOnly] = useState(true);

  const handleChange = (field, value) => {
    setEditedPetData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleEditClick = () => {
    setIsReadOnly(!isReadOnly);
  };

  const handleUpdateClick = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(`${API_ROUTES.PET}/${editedPetData.id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(editedPetData),
      });

      if (response.ok) {
        alert('Pet information updated successfully');
        handleClose();
        onUpdate();
      } else {
        alert('Failed to update pet information');
      }
    } catch (error) {
      alert(`Error updating pet information: ${error.message}`);
    }
  };
  

  const handleDeleteClick = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(`${API_ROUTES.PET}/disable/${editedPetData.id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ is_disabled: true }),
      });

      if (response.ok) {
        alert('Pet profile deleted successfully');
        handleClose();
        onUpdate();
      } else {
        alert('Failed to delete the pet profile');
      }
    } catch (error) {
      alert(`Error deleting pet profile: ${error.message}`);
    }
  };

  const notdisplayFields = ['password','gender','food_type', 'is_active', 'created_at', 'updated_at'];
  const editableFields = ['pet_name','weight','age','last_vet_visit','next_vet_visit','food_brand','food_amount'];

  const filteredFields = Object.keys(petData).filter((field) => !notdisplayFields.includes(field));

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {isReadOnly ? 'View Pet Profile' : 'Update Pet Profile'}
          </Typography>
          <IconButton className='edit profile' color="primary" onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <br />
      <DialogContent>
        <Grid container spacing={2}>
          {filteredFields.map((field) => (
            <Grid key={field} item xs={12} md={6}>
              <TextField
                label={field
                  .split('_')
                  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                  .join(' ')}
                fullWidth
                value={editedPetData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                disabled={isReadOnly || !editableFields.includes(field)}
              />
            </Grid>
          ))}
          {/* Drop-down for Gender */}
          <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" sx={{ fontSize: '15px', marginBottom: '5px', color: 'grey' }}>
            Gender:
          </Typography>
            <Select
              value={editedPetData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              disabled={isReadOnly}
              fullWidth
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </Grid>
          {/* Drop-down for Food Type */}
          <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" sx={{ fontSize: '15px', marginBottom: '5px', color: 'grey' }}>
            Food Type:
          </Typography>
            <Select
              value={editedPetData.food_type}
              onChange={(e) => handleChange('food_type', e.target.value)}
              disabled={isReadOnly}
              fullWidth
            >
              <MenuItem value="dry">Dry</MenuItem>
              <MenuItem value="wet">Wet</MenuItem>
              <MenuItem value="raw">Raw</MenuItem>
            </Select>
          </Grid>
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

export default PetDialog;
