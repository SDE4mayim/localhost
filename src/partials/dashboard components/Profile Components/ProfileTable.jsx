import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { API_ROUTES } from '../../../utils/constants';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import CreateProfileDialog from './CreateProfileDialog';
import ProfileDialog from './ProfileDialog';
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

const getColumnsForData = (dataType) => {
  let columns = [];

  switch (dataType) {
    case 'Hospitalprofile':
      columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        //{ field: 'profile_id', headerName: 'Profile ID', width: 100 },
        //{ field: 'userlimit', headerName: 'Userlimit', width: 100 },
        //{ field: 'category_id', headerName: 'Category ID', width: 100 },
        // Add other doctor-specific columns as needed
      ];
      break;
    
     case 'Doctorprofile':
      columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        //{ field: 'profile_id', headerName: 'Profile ID', width: 100 },
        //{ field: 'hospital_id', headerName: 'Hospital ID', width: 100 },
        // Add other doctor-specific columns as needed
      ];
      break;

    case 'Petownerprofile':
      columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        //{ field: 'profile_id', headerName: 'Profile ID', width: 100 },
        //{ field: 'hospital_id', headerName: 'Hospital ID', width: 100 },
        //{ field: 'doctor_id', headerName: 'Doctor ID', width: 100 },
        // Add other pet owner-specific columns as needed
      ];
      break;

    default:
      // Default columns if data type is not recognized
      columns = [];
      break;
  }

  // Common columns for all data types
  const commonColumns = [
    { field: 'profile_image_url', headerName: 'Profile Picture', width: 120,
    renderCell: (params) => (
      <div style={{width: '32px',height: '32px', borderRadius: '50%',marginRight: '10px',objectFit: 'cover'}}>
     {params.value ? (
            <img
              src={params.value}
              alt="Profile Image"
              className="image"
            />
          ) : (
            <img
              src= {Noimg}
              alt="No Image"
              className="image"
            />
          )}
      </div>
    )},
    { field: 'user_name', headerName: 'User Name', width: 200 },
    //{ field: 'first_name', headerName: 'First Name', width: 150 },
    //{ field: 'last_name', headerName: 'Last Name', width: 150 },
    //{ field: 'gender', headerName: 'Gender', width: 120 },
    //{ field: 'date_of_birth', headerName: 'Date of Birth', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'alt_phone', headerName: 'Alt Phone', width: 150 },
    { field: 'email', headerName: 'Email', width: 225 },
    //{ field: 'street_address', headerName: 'Street Address', width: 200 },
    //{ field: 'city_name', headerName: 'City Name', width: 150 },
    //{ field: 'state_name', headerName: 'State Name', width: 150 },
    //{ field: 'postal_code', headerName: 'Postal Code', width: 150 },
    //{ field: 'country', headerName: 'Country', width: 150 },
    /*{ field: 'is_active', headerName: 'Is Active', width: 120,
    cellClassName: (params) => {
      const status = params.value;
      let className = 'cellWithStatus';
  
      if (status === 1) {
        className += ' open';
      } else if (status === 0) {
        className += ' close';
      }
  
      return className;
    } 
  },*/
    /*{ field: 'createdAt', headerName: 'Created At', width: 200, valueGetter: (params) => {
      return formatTimestamp(params.row.createdAt)}},
    { field: 'updatedAt', headerName: 'Updated At', width: 200, valueGetter: (params) => {
      return formatTimestamp(params.row.updatedAt)} },*/
  ]

  return columns.concat(commonColumns);
};


const ProfileTable = ({ dataType }) => {
  const [data, setData] = useState([]);
  const authToken = localStorage.getItem('accessToken');
  const [selectedRow, setSelectedRow] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [readOnly, setReadOnly] = useState(true); // Set to true for viewing, false for updating
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  let apiRoute = '';
      switch (dataType) {
        case 'Hospital':
          apiRoute = API_ROUTES.HOSPITAL;
          break;
        case 'Doctor':
          apiRoute = API_ROUTES.DOCTORS;
          break;
        case 'Petowner':
          apiRoute = API_ROUTES.PET_OWNERS;
          break;
        default:
          break;
      }
  

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
      const apiUrl = `${apiRoute}?parameter=user_name&value=${searchValue}`;
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
  
      const response = await fetch(apiUrl, { headers });
  
      if (response.ok) {
        const searchData = await response.json();
        setData(searchData);
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
    fetchAndTransformData();
  };

  const renderDialog = () => {
    if (!selectedRow || !dialogOpen) return null;

    return (
      <ProfileDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        readOnly={readOnly}
        dataType = {dataType}
        profileData={selectedRow}
        authToken = {authToken}
        onUpdate={handleProfileUpdate}
      />
    );
  };

  const handleProfileUpdate = () => {
    fetchAndTransformData(); // Assuming you have a function to fetch or reload table data
    setDialogOpen(false);
  };

  const fetchAndTransformData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
  
      const response = await fetch(apiRoute, { headers });
      const data = await response.json();
  
      setData(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchAndTransformData();
  }, [authToken, dataType]);
  
  const columns = getColumnsForData(dataType);

  return (
    <div>
       <Grid container spacing={2} alignItems="center" style={{ display: 'flex', justifyContent: 'center' }}>
      <Grid item>
        <TextField
          id="search"
          label={"Search by " + dataType + "'s Name"}
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
          <CreateProfileDialog open={isAddDialogOpen} handleClose={handleCloseAddDialog} authToken={authToken} profileType={dataType} />
        )}
      </Grid>
    </Grid>
    <br/>
    <DataGrid
      
      rows={data}
      columns={columns.concat(actionColumn)}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
    />
    {renderDialog()}
  </div>
);
};      

export default ProfileTable;
