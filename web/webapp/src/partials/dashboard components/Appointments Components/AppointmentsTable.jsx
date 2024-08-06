// AppointmentTable.jsx
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { API_ROUTES } from '../../../utils/constants';
import CreateAppointmentDialog from './CreateAppointmentDialog';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import AppointmentDialog from './AppointmentDialog';
import Noimg from '../../../images/no-image-icon-0.jpg';

const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';

  const date = new Date(timestamp);
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    //second: '2-digit',
  };

  return date.toLocaleString(undefined, options);
};

const columns = [
  { field: 'id', headerName: 'ID', width: 120 },
  
  { field: 'pet_id', headerName: 'Pet ID', width: 120 },
  // { field: 'owner_id', headerName: 'Owner ID', width: 120 },
  { field: 'doctor_id', headerName: 'Doctor ID', width: 120 },
  { field: 'appointment_date', headerName: 'Appointment Date', width: 200,
    valueGetter: (params) => {
      return formatTimestamp(params.row.appointment_date);
    }
  },
  
  { field: 'appointment_notes', headerName: 'Appointment Notes', width: 200 },
 
];

const AppointmentTable = () => {
  const [appData, setApntData] = useState([]);
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }} className="cellAction">
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
      const apiUrl = `${API_ROUTES.APPOINTMENTS}?parameter=id&value=${searchValue}`;
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
  
      const response = await fetch(apiUrl, { headers });
  
      if (response.ok) {
        const searchData = await response.json();
        setApntData(searchData);
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
    fetchApntData();
    
  };

  const renderDialog = () => {
    if (!selectedRow || !dialogOpen) return null;

    return (
        <AppointmentDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        appData={selectedRow}
        authToken={authToken}
        onUpdate = {handleProfileUpdate}
      />
    );
  };

  const handleProfileUpdate = () => {
    fetchApntData(); // Assuming you have a function to fetch or reload table data
    setDialogOpen(false);
  };


  const fetchApntData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
  
      // const response = await fetch (API_ROUTES.APPOINTMENTS, { 
      //   method: 'GET',
      //   headers: headers});
      // const data = await response.json();
      

      const response = await fetch(API_ROUTES.APPOINTMENTS, { headers });
      const data = await response.json();
  
      const transformedData = data.map((item) => ({
        id: item.id,
        pet_id: item.pet_id,
        doctor_id: item.doctor_id,
        appointment_date: item.appointment_date,
        appointment_notes: item.appointment_notes
      }));
  
      setApntData(transformedData);
      console.log(data);
    } catch (error) {
      console.error('Error fetching appointment:', error);
    }
  };
  
  useEffect(() => {
    fetchApntData();
  }, [authToken]);
  

  return (
    <div>
       <Grid container spacing={2} alignItems="center" style={{ display: 'flex', justifyContent: 'center' }}>
      <Grid item>
        <TextField
          id="search"
          label="Search by Appointments"
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
          <CreateAppointmentDialog open={isAddDialogOpen} handleClose={handleCloseAddDialog} />
        )}
      </Grid>
    </Grid>
    <br/>
      <DataGrid
        rows={appData}
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

export default AppointmentTable;