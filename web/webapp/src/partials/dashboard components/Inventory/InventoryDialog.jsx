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

const InventoryDialog = ({ open, handleClose, inventoryData, authToken, onUpdate }) => {
  const [editedInventoryData, setEditedInventoryData] = useState({ ...inventoryData });
  const [isReadOnly, setIsReadOnly] = useState(true);

  const handleChange = (field, value) => {
    setEditedInventoryData((prevData) => ({
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

      const response = await fetch(`${API_ROUTES.INVENTORY }/${editedInventoryData.id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(editedInventoryData),
      });

      if (response.ok) {
        alert('Drug details updated successfully');
        handleClose();
        onUpdate();
      } else {
        alert('Failed to update Drug details');
      }
    } catch (error) {
      alert(`Error updating Drug details: ${error.message}`);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(`${API_ROUTES.INVENTORY}/disable/${editedInventoryData.id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({ is_disabled: true }),
      });

      if (response.ok) {
        alert('Drug deleted successfully');
        handleClose();
        onUpdate();
      } else {
        alert('Failed to delete the Drug');
      }
    } catch (error) {
      alert(`Error deleting Drug: ${error.message}`);
    }
  };

  const notdisplayFields = ['id','pcode','pname'];
  const editableFields = ['remarks','features','mrp','gst','instock'];

  const filteredFields = Object.keys(inventoryData).filter((field) => !notdisplayFields.includes(field));

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {isReadOnly ? 'View Drug' : 'Update Drug'}
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
                value={editedInventoryData[field]}
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

export default InventoryDialog;
