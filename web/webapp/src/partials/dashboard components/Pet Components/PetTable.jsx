// PetTable.jsx
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { API_ROUTES } from '../../../utils/constants';
import CreatePetDialog from './CreatePetDialog';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import PetDialog from './PetDialog';
import Noimg from '../../../images/no-image-icon-0.jpg';

const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';

  const date = new Date(timestamp);
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    /*hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',*/
  };

  return date.toLocaleString(undefined, options);
};

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'owner_id', headerName: 'Owner ID', width: 120 },
  { field: 'pet_type_id', headerName: 'Pet Type ID', width: 120 },
  { field: 'pet_name', headerName: 'Pet Name', width: 150 },
  { field: 'gender', headerName: 'Gender', width: 120 },
  //{ field: 'age', headerName: 'Age', width: 90 },
  //{ field: 'weight', headerName: 'Weight', width: 120 },
  { field: 'last_vet_visit', headerName: 'Last Vet Visit', width: 180,
    valueGetter: (params) => {
      return formatTimestamp(params.row.last_vet_visit);
    }
  },
  { field: 'next_vet_visit', headerName: 'Next Vet Visit', width: 180,
    valueGetter: (params) => {
      return formatTimestamp(params.row.next_vet_visit);
    }
  },
  //{ field: 'food_brand', headerName: 'Food Brand', width: 150 },
  //{ field: 'food_type', headerName: 'Food Type', width: 120 },
  //{ field: 'food_amount', headerName: 'Food Amount', width: 150 },
  //{ field: 'is_active', headerName: 'Is Active', width: 120 },
];

const PetTable = () => {
  const [petData, setPetData] = useState([]);
  const authToken = localStorage.getItem('accessToken');
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }} className="cellAction">
          <div style={{ padding: '2px 5px', borderRadius: '5px', color: 'darkblue', border: '1px dotted rgba(0, 0, 139, 0.596)', cursor: 'pointer' }} className="viewbutton" onClick={() => handleViewClick(params.row)}>
            View More Details
          </div>
        </div>
      ),
    },
  ];

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setReadOnly(true);
    setDialogOpen(true);
  };
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async (searchValue) => {
    try {
      const apiUrl = `${API_ROUTES.PET}?parameter=pet_name&value=${searchValue}`;
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
  
      const response = await fetch(apiUrl, { headers });
  
      if (response.ok) {
        const searchData = await response.json();
        setPetData(searchData);
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error in handleSearch:', error.message);
    }
  };
  

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAddClick = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setIsAddDialogOpen(false);
    fetchPetData();
  };

  const renderDialog = () => {
    if (!selectedRow || !dialogOpen) return null;

    return (
      <PetDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        petData={selectedRow}
        authToken={authToken}
        onUpdate = {handleProfileUpdate}
      />
    );
  };

  const handleProfileUpdate = () => {
    fetchPetData(); // Assuming you have a function to fetch or reload table data
    setDialogOpen(false);
  };


  const fetchPetData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
  
      const response = await fetch(API_ROUTES.PET, { headers });
      const data = await response.json();
  
      const transformedData = data.map((item) => ({
        id: item.id,
        pet_name: item.pet_name,
        pet_type_id: item.pet_type_id,
        gender: item.gender,
        age: item.age,
        weight: item.weight,
        owner_id: item.owner_id,
        last_vet_visit: item.last_vet_visit,
        next_vet_visit: item.next_vet_visit,
        food_brand: item.food_brand,
        food_type: item.food_type,
        food_amount: item.food_amount,
        is_active: item.is_active,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));
  
      setPetData(transformedData);
    } catch (error) {
      console.error('Error fetching pet data:', error);
    }
  };
  
  useEffect(() => {
    fetchPetData();
  }, [authToken]);
  

  return (
    <div>
       <Grid container spacing={2} alignItems="center" style={{ display: 'flex', justifyContent: 'center' }}>
      <Grid item>
        <TextField
          id="search"
          label="Search by Pet's Name"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={() => handleSearch(searchQuery)} >
          Search
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleAddClick}>
          Add
        </Button>
        {isAddDialogOpen && (
          // Conditionally render the appropriate dialog based on the selected search type
          <CreatePetDialog open={isAddDialogOpen} handleClose={handleCloseAddDialog} />
        )}
      </Grid>
    </Grid>
    <br/>
      <DataGrid
        rows={petData}
        columns={columns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      {renderDialog()}
    </div>
  );
};

export default PetTable;