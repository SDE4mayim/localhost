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
} 
from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import API_ROUTES from '../../../utils/constants';

const CreateInventoryDialog = ({ open, handleClose, authToken }) => {
  const [pcode, setProductCode] = useState('');
  const [rate,setRate]= useState('');
  const [hsn,setHsnCode]= useState('');
  const [pname, setProductName] = useState('');
  const [features, setFeatures] = useState('');
  const [remarks, setRemarks] = useState('');
  const [gst, setGst] = useState('');
  const [mrp, setMrp] = useState('');
  const [instock, setInStock] = useState('');
  const [product_category,setProductCategory]=useState([]);
  const [catid,setCategoryId]= useState('');

  const handleChange = (field, value) => {
    switch (field) {
      case 'pcode':
        setProductCode(value);
        break;
      case 'rate':
        setRate(value);
        break;
      case 'pname':
        setProductName(value);
        break;
      case 'features':
        setFeatures(value);
        break;
      case 'remarks':
        setRemarks(value);
        break;
      case 'gst':
        setGst(value);
        break;
      case 'mrp':
        setMrp(value);
        break;
      case 'instock':
        setInStock(value);
        break;
      case 'hsn':
        setHsnCode(value);
        break;
      case 'catid':
        setCategoryId(value);
        break;
      default:
        break;
    }
  };

  

  const handleSaveClick = async () => {
    try {
      if (!features && !remarks && !gst && !mrp && !instock && !pname && !pcode && !hsn && !rate ) {
        alert('Please fill in all required fields.');
        return;
      }
      if(!pname){
        alert('Please Enter the Product Name.');
        return;
      }
      if(!hsn){
        alert('Please Enter the HSN code.');
        return;
      }
      if(!rate){
        alert('Please Enter the Rate.');
        return;
      }
      if(!pcode){
        alert('Please Enter the Product Code.');
        return;
      }
      if(!features){
        alert('Please Enter the Features of the Drug.');
        return;
      }
      if(!remarks){
        alert('Please Enter the remarks of the Drug.');
        return;
      }
      if(!gst){
        alert('Please Enter the GST percentage.');
        return;
      }
      if(!mrp){
        alert('Please Enter the MRP of the Product.');
        return;
      }
      if(!instock){
        alert('Please Enter the Stock Remaining.');
        return;
      }
     
      const headers = {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      };

      const inventoryData = {

        pname,
        rate,
        features,
        remarks,
        catid,
        gst,
        mrp,
        instock,
        pcode,
        hsn
      };


      const response = await fetch(API_ROUTES.INVENTORY, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(inventoryData),
      });

      if (response.ok) {
        alert('Drug added successfully');
        handleClose();

        // Optionally, you can fetch and update the pet data in the parent component
      } else {
        alert('Failed to add Drug');
      }
    } catch (error) {
      alert(`Error adding Drug: ${error.message}`);
    }
  };

  
  useEffect(() => {
    // Fetch pet types from the API
    
    const fetchCategoryId = async () => {
      try {
        const response = await fetch(API_ROUTES.PRODUCTCATEGORY);
        if (response.ok) {
          const data = await response.json();
          setProductCategory(data);
          console.log('category:', data);
        } else {
          console.error("Error fetching Product Category:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Product Category:", error.message);
      }
    };

    fetchCategoryId();
  }, []);
  
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Add Inventory</Typography>
          <IconButton color="primary" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category ID</InputLabel>
            <Select
              label="Category ID"
              value={catid}
              onChange={(e) => handleChange('catid', e.target.value)}
              fullWidth
              required
            >
              {product_category.map((prodcat) => (
                <MenuItem key={prodcat.id} value={prodcat.id}>
                  {prodcat.id} {prodcat.category_name}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Product Code"
              fullWidth
              value={pcode}
              onChange={(e) => handleChange('pcode', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Product Name"
              fullWidth
              value={pname}
              onChange={(e) => handleChange('pname', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="HSN Code"
              fullWidth
              value={hsn}
              onChange={(e) => handleChange('hsn', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Rate"
              fullWidth
              value={rate}
              onChange={(e) => handleChange('rate', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Features"
              fullWidth
              value={features}
              onChange={(e) => handleChange('features', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Remarks"
              fullWidth
              value={remarks}
              onChange={(e) => handleChange('remarks', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Available"
              fullWidth
              value={instock}
              onChange={(e) => handleChange('instock', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="GST in %"
              fullWidth
              value={gst}
              onChange={(e) => handleChange('gst', e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="MRP"
              fullWidth
              value={mrp}
              onChange={(e) => handleChange('mrp', e.target.value)}
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

export default CreateInventoryDialog;
