import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const TableWithFilters = ({ data }) => {
  const [rows, setRows] = useState(data);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const handleFilterSubmit = () => {
    const filteredRows = data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(filter)
      )
    );
    setRows(filteredRows);
  };

  const columns = data.length > 0 ? Object.keys(data[0]).map((key) => ({ field: key })) : [];

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <TextField
            id="filter"
            label="Filter"
            variant="outlined"
            size="small"
            value={filter}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleFilterSubmit}>
            Apply Filter
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </div>
  );
};

export default TableWithFilters;
