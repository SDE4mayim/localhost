// InventoryTable.jsx
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import { API_ROUTES } from '../../../utils/constants';
import CreateInventoryDialog from './CreateInventoryDialog';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button,FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import InventoryDialog from './InventoryDialog';
import Noimg from '../../../images/no-image-icon-0.jpg';

const columns = [
  { field: 'id', headerName: 'ID', width: 20 },
  { field: 'hsn', headerName: 'HSN', width: 60 },
  { field: 'pcode', headerName: 'Code', width: 90 },
  { field: 'catid', headerName: 'Category ID', width: 90 },
  { field: 'pname', headerName: 'Product', width: 170 },
  { field: 'features', headerName: 'Features', width: 200 },
  { field: 'remarks', headerName: 'Remarks', width:200 },
  { field: 'rate', headerName: 'Rate', width: 40 },
  { field: 'instock', headerName: 'Available', width: 100 },
  { field: 'gst', headerName: 'GST %', width: 70 },
  { field: 'mrp', headerName: 'MRP', width: 70 },
];

const InventoryTable = () => {
  const [inventoryData, setInventoryData] = useState([]);
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
      width: 40,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }} className="cellAction">
          <div style={{ padding: '2px 5px', borderRadius: '5px', color: 'darkblue', border: '1px dotted rgba(0, 0, 139, 0.596)', cursor: 'pointer' }} className="viewbutton" onClick={() => handleViewClick(params.row)}>
            Edit
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
      const apiUrl = `${API_ROUTES.INVENTORY}?parameter=pcode&value=${searchValue}`;
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
  
      const response = await fetch(apiUrl, { headers });
  
      if (response.ok) {
        const searchData = await response.json();
        setInventoryData(searchData);
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
    fetchInventoryData();
    
  };

  const renderDialog = () => {
    if (!selectedRow || !dialogOpen) return null;

    return (
        <InventoryDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        inventoryData={selectedRow}
        authToken={authToken}
        onUpdate = {handleProfileUpdate}
      />
    );
  };

  const handleProfileUpdate = () => {
    fetchInventoryData(); // Assuming you have a function to fetch or reload table data
    setDialogOpen(false);
  };


  const fetchInventoryData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };
      const response = await fetch(API_ROUTES.INVENTORY, { headers });
      const data = await response.json();
  
      const transformedData = data.map((item) => ({
        id: item.id,
        pname: item.pname,
        rate: item.rate,
        features: item.features,
        remarks:item.remarks,
        catid: item.catid,
        gst:item.gst,
        mrp:item.mrp,
        instock:item.instock,
        pcode:item.pcode,
        hsn: item.hsn,
      }));
  
      setInventoryData(transformedData);
      console.log(data);
    } catch (error) {
      console.error('Error fetching Inventory:', error);
    }
  };
  
  useEffect(() => {
    fetchInventoryData();
  }, [authToken]);
  

  return (
    <div>
       <Grid container spacing={2} alignItems="center" style={{ display: 'flex', justifyContent: 'center' }}>
      <Grid item>
        <TextField
          id="search"
          label="Search by Item"
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
          <CreateInventoryDialog open={isAddDialogOpen} handleClose={handleCloseAddDialog} />
        )}
      </Grid>
    </Grid>
    <br/>
      <DataGrid
        rows={inventoryData}
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

export default InventoryTable;