import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Hospital Bed Management
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/patients"
          >
            Patients
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/beds"
          >
            Beds
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/schedule"
          >
            Schedule
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/pharmacy"
          >
            Pharmacy
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/audit"
          >
            Audit Log
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 