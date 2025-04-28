import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Chip,
} from '@mui/material';
import axios from 'axios';

function Beds() {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [newBed, setNewBed] = useState({
    bedNumber: '',
    ward: '',
  });

  useEffect(() => {
    fetchBeds();
    const interval = setInterval(fetchBeds, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchBeds = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/beds');
      setBeds(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching beds:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBed({ ...newBed, [name]: value });
  };

  const handleAddBed = async () => {
    try {
      await axios.post('http://localhost:5000/api/beds', newBed);
      setOpenDialog(false);
      setNewBed({
        bedNumber: '',
        ward: '',
      });
      fetchBeds();
    } catch (error) {
      console.error('Error adding bed:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'occupied':
        return 'error';
      case 'maintenance':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Beds</Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
          Add New Bed
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bed Number</TableCell>
              <TableCell>Ward</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {beds.map((bed) => (
              <TableRow key={bed._id}>
                <TableCell>{bed.bedNumber}</TableCell>
                <TableCell>{bed.ward}</TableCell>
                <TableCell>
                  <Chip
                    label={bed.status}
                    color={getStatusColor(bed.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {bed.patientId ? bed.patientId.name : 'None'}
                </TableCell>
                <TableCell>
                  {new Date(bed.lastUpdated).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Bed</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="bedNumber"
            label="Bed Number"
            fullWidth
            value={newBed.bedNumber}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="ward"
            label="Ward"
            fullWidth
            value={newBed.ward}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddBed} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Beds; 