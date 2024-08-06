import * as React from 'react';
import {Link} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { handleLogout } from '../../utils/constants';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PetsIcon from '@mui/icons-material/Pets';
import PeopleIcon from '@mui/icons-material/People';
import MedicationIcon from '@mui/icons-material/Medication';
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems = (

  <React.Fragment>
    <ListItemButton component={Link} to="/maindashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/asd">
      <ListItemIcon>
      <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Appointments" />
    </ListItemButton>
    <ListItemButton component={Link} to="/diagnosis">
      <ListItemIcon>
      <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Diagnosis" />
    </ListItemButton>
    <ListItemButton component={Link} to="/psd">
      <ListItemIcon>
        <PetsIcon />
      </ListItemIcon>
      <ListItemText primary="Pets" />
    </ListItemButton>
    <ListItemButton component={Link} to="/csd">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Pet Owners" />
    </ListItemButton>
    <ListItemButton component={Link} to="/hsd">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Hospitals" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dsd">
      <ListItemIcon>
      <MedicationIcon />
      </ListItemIcon>
      <ListItemText primary="Doctors" />
    </ListItemButton>
    <ListItemButton component={Link} to="/inventory">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Inventory" />
    </ListItemButton>
    <ListItemButton component={Link} to="/" onClick={handleLogout}>
      <ListItemIcon>
      <LogoutIcon/>
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);