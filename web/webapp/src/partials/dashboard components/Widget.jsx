import React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EventIcon from '@mui/icons-material/Event';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import PetsIcon from '@mui/icons-material/Pets';

const Widget = ({ type, feature }) => {
  const entityIcons = {
    PetOwners: [
      { action: 'Add', text: 'Add Pet Owner', icon: <PersonAddIcon style={{ fontSize: '100px' }} /> },
      { action: 'Update', text: 'Update Pet Owner', icon: <UpdateIcon style={{ fontSize: '100px' }} /> },
      { action: 'Delete', text: 'Delete Pet Owner', icon: <DeleteIcon style={{ fontSize: '100px' }} /> },
      { action: 'View', text: 'View Pet Owner', icon: <VisibilityIcon style={{ fontSize: '100px' }} /> },
      { action: 'Search', text: 'Search Pet Owner', icon: <SearchIcon style={{ fontSize: '100px' }} /> },
    ],
    Doctors: [
      { action: 'Add', text: 'Add Doctor', icon: <LocalHospitalIcon style={{ fontSize: '100px' }} /> },
      { action: 'Update', text: 'Update Doctor', icon: <UpdateIcon style={{ fontSize: '100px' }} /> },
      { action: 'Delete', text: 'Delete Doctor', icon: <DeleteIcon style={{ fontSize: '100px' }} /> },
      { action: 'View', text: 'View Doctor', icon: <VisibilityIcon style={{ fontSize: '100px' }} /> },
      { action: 'Search', text: 'Search Doctor', icon: <SearchIcon style={{ fontSize: '100px' }} /> },
    ],
    Appointments: [
      { action: 'Add', text: 'Add Appointment', icon: <EventIcon style={{ fontSize: '100px' }} /> },
      { action: 'Update', text: 'Update Appointment', icon: <UpdateIcon style={{ fontSize: '100px' }} /> },
      { action: 'Delete', text: 'Delete Appointment', icon: <DeleteIcon style={{ fontSize: '100px' }} /> },
      { action: 'View', text: 'View Appointment', icon: <VisibilityIcon style={{ fontSize: '100px' }} /> },
      { action: 'Search', text: 'Search Appointment', icon: <SearchIcon style={{ fontSize: '100px' }} /> },
    ],
    Pet: [
      { action: 'Add', text: 'Add Pet', icon: <PetsIcon style={{ fontSize: '100px' }} /> },
      { action: 'Update', text: 'Update Pet', icon: <UpdateIcon style={{ fontSize: '100px' }} /> },
      { action: 'Delete', text: 'Delete Pet', icon: <DeleteIcon style={{ fontSize: '100px' }} /> },
      { action: 'View', text: 'View Pet', icon: <VisibilityIcon style={{ fontSize: '100px' }} /> },
      { action: 'Search', text: 'Search Pet', icon: <SearchIcon style={{ fontSize: '100px' }} /> },
    ],
  };

  const handleClick = (action) => {
    console.log(`Performing ${action} action for ${type}...`);
    // Perform actions based on the 'type' and 'action'
  };

  const entityActions = entityIcons[type] || [];

  // Filter the icons based on the provided feature
  const filteredIcons = entityActions.filter((icon) => icon.action === feature);

  return (
    <React.Fragment>
      {filteredIcons.map((icon) => (
        <div style={{cursor: 'pointer'}} key={`${type}-${icon.action}` } onClick={() => handleClick(icon.action)} >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Title>{icon.text}</Title>
          </div>
          <Typography
            color="text.secondary"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            {icon.icon}
          </Typography>
          <div>
            <Typography color="black" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {icon.action}
            </Typography>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Widget;