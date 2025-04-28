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
  MenuItem,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  LocalHospital as HospitalIcon,
  Person as PersonIcon,
  Event as EventIcon,
  PriorityHigh as PriorityIcon,
  ExitToApp as DischargeIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  borderRadius: '15px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '10px',
  textTransform: 'none',
  padding: '10px 20px',
  fontWeight: 600,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  },
}));

function Patients() {
  const theme = useTheme();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [dischargeDialog, setDischargeDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    condition: '',
    priority: 'medium',
  });

  useEffect(() => {
    fetchPatients();
    const interval = setInterval(fetchPatients, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patients');
      setPatients(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleAdmitPatient = async () => {
    try {
      // Validate required fields
      if (!newPatient.name || !newPatient.age || !newPatient.gender || !newPatient.condition) {
        alert('Please fill in all required fields');
        return;
      }

      // Convert age to number
      const patientData = {
        ...newPatient,
        age: parseInt(newPatient.age)
      };

      const response = await fetch('http://localhost:5000/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to admit patient');
      }

      const data = await response.json();
      setPatients([...patients, data]);
      setNewPatient({
        name: '',
        age: '',
        gender: '',
        condition: '',
        priority: 'medium'
      });
      setOpenDialog(false);
      alert('Patient admitted successfully!');
    } catch (error) {
      console.error('Error admitting patient:', error);
      alert(`Error admitting patient: ${error.message}`);
    }
  };

  const handleDischargePatient = async (patientId) => {
    try {
      await axios.put(`http://localhost:5000/api/patients/${patientId}/discharge`);
      fetchPatients();
      setDischargeDialog(false);
      setSelectedPatient(null);
    } catch (error) {
      console.error('Error discharging patient:', error);
      alert('Error discharging patient. Please try again.');
    }
  };

  const openDischargeConfirmation = (patient) => {
    setSelectedPatient(patient);
    setDischargeDialog(true);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold', 
          color: theme.palette.primary.main,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <HospitalIcon fontSize="large" />
          Patient Management
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
          Manage patient admissions, discharges, and transfers
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Patients</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {patients.length}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EventIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Admitted Today</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {patients.filter(p => new Date(p.admissionDate).toDateString() === new Date().toDateString()).length}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PriorityIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Critical Cases</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                {patients.filter(p => p.priority === 'high').length}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <StyledButton
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Admit New Patient
        </StyledButton>
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          mt: 3, 
          borderRadius: '15px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Condition</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Priority</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Bed</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow 
                key={patient._id}
                sx={{ 
                  '&:hover': { 
                    bgcolor: alpha(theme.palette.primary.main, 0.05) 
                  } 
                }}
              >
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.condition}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 1,
                      py: 0.5,
                      borderRadius: '4px',
                      bgcolor: 
                        patient.priority === 'high' ? 'error.light' :
                        patient.priority === 'medium' ? 'warning.light' :
                        'success.light',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    {patient.priority}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 1,
                      py: 0.5,
                      borderRadius: '4px',
                      bgcolor: 
                        patient.status === 'admitted' ? 'success.light' :
                        patient.status === 'discharged' ? 'error.light' :
                        'warning.light',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    {patient.status}
                  </Box>
                </TableCell>
                <TableCell>{patient.bedId?.bedNumber || 'Not assigned'}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {patient.status === 'admitted' && (
                      <Tooltip title="Discharge Patient">
                        <IconButton
                          color="primary"
                          onClick={() => openDischargeConfirmation(patient)}
                        >
                          <DischargeIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '15px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AddIcon color="primary" />
            <Typography variant="h6">Admit New Patient</Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={newPatient.name}
                onChange={handleInputChange}
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={newPatient.age}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={newPatient.gender}
                  onChange={handleInputChange}
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Condition"
                name="condition"
                value={newPatient.condition}
                onChange={handleInputChange}
                variant="outlined"
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  value={newPatient.priority}
                  onChange={handleInputChange}
                  label="Priority"
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}` }}>
          <StyledButton onClick={() => setOpenDialog(false)}>
            Cancel
          </StyledButton>
          <StyledButton 
            onClick={handleAdmitPatient} 
            variant="contained" 
            color="primary"
          >
            Admit Patient
          </StyledButton>
        </DialogActions>
      </Dialog>

      {/* Discharge Confirmation Dialog */}
      <Dialog
        open={dischargeDialog}
        onClose={() => {
          setDischargeDialog(false);
          setSelectedPatient(null);
        }}
      >
        <DialogTitle>Confirm Patient Discharge</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Are you sure you want to discharge {selectedPatient?.name}?
          </Alert>
          <Typography variant="body1">
            This action cannot be undone. Please ensure all necessary documentation and procedures are completed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDischargeDialog(false);
              setSelectedPatient(null);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDischargePatient(selectedPatient?._id)}
            color="primary"
            variant="contained"
          >
            Confirm Discharge
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Patients; 