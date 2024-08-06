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

const DiagnosisDialog = ({ open, handleClose, appData, authToken, onUpdate }) => {
  const [editedAppData, setEditedAppData] = useState({ ...appData });
  const [isReadOnly, setIsReadOnly] = useState(true);

  const handleChange = (field, value) => {
    setEditedAppData((prevData) => ({
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

      const response = await fetch(`${API_ROUTES.DIAGNOSIS }/${editedAppData.id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(editedAppData),
      });

      if (response.ok) {
        alert('Diagnosis updated successfully');
        handleClose();
        onUpdate();
      } else {
        alert('Failed to update Diagnosis');
      }
    } catch (error) {
      alert(`Error updating Diagnosis: ${error.message}`);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(`${API_ROUTES.DIAGNOSIS}disable/${editedAppData.id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ is_disabled: true }),
      });

      if (response.ok) {
        alert('Diagnosis deleted successfully');
        handleClose();
        onUpdate();
      } else {
        alert('Failed to delete the Diagnosis');
      }
    } catch (error) {
      alert(`Error deleting Diagnosis: ${error.message}`);
    }
  };

  const notdisplayFields = ['pet_id','doctor_id'];
  const editableFields = ['diagnosis_date','diagnosis_notes'];

  const filteredFields = Object.keys(appData).filter((field) => !notdisplayFields.includes(field));

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {isReadOnly ? 'View Diagnosis' : 'Update Diagnosis'}
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
                value={editedAppData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                disabled={isReadOnly || !editableFields.includes(field)}
              />
            </Grid>
          ))}
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

export default DiagnosisDialog;
