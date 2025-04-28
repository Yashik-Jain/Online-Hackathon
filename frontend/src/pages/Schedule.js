import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  useTheme,
  alpha,
  styled,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
  Room as RoomIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  borderRadius: '15px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
}));

function Schedule() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [appointments, setAppointments] = useState([]);

  const [newAppointment, setNewAppointment] = useState({
    doctor: '',
    specialty: '',
    patient: '',
    date: '',
    time: '',
    room: '',
    type: '',
  });

  const [editingAppointment, setEditingAppointment] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({ ...newAppointment, [name]: value });
  };

  const handleEditClick = (appointment) => {
    setEditingAppointment(appointment);
    setEditDialog(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingAppointment({ ...editingAppointment, [name]: value });
  };

  const handleAddAppointment = () => {
    if (!newAppointment.doctor || !newAppointment.patient || !newAppointment.date || !newAppointment.time) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error',
      });
      return;
    }

    const appointment = {
      id: appointments.length + 1,
      ...newAppointment,
      status: 'Scheduled',
    };

    setAppointments([...appointments, appointment]);
    setNewAppointment({
      doctor: '',
      specialty: '',
      patient: '',
      date: '',
      time: '',
      room: '',
      type: '',
    });
    setOpenDialog(false);
    setSnackbar({
      open: true,
      message: 'Appointment added successfully',
      severity: 'success',
    });
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
    setSnackbar({
      open: true,
      message: 'Appointment deleted successfully',
      severity: 'success',
    });
  };

  const handleUpdateAppointment = () => {
    if (!editingAppointment.doctor || !editingAppointment.patient || !editingAppointment.date || !editingAppointment.time) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error',
      });
      return;
    }

    const updatedAppointment = {
      ...editingAppointment,
      status: 'Scheduled',
    };

    setAppointments(appointments.map(appt => 
      appt.id === updatedAppointment.id ? updatedAppointment : appt
    ));

    setEditDialog(false);
    setEditingAppointment(null);
    setSnackbar({
      open: true,
      message: 'Appointment updated successfully',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <CalendarIcon fontSize="large" />
            Appointment Schedule
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
            Manage and schedule patient appointments
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarIcon color="primary" sx={{ mr: 1, fontSize: 40 }} />
                  <Typography variant="h6">Today's Appointments</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                  {appointments.filter(appt => {
                    const appointmentDate = new Date(appt.date);
                    const today = new Date();
                    return appointmentDate.toDateString() === today.toDateString();
                  }).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Scheduled for today
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TimeIcon color="primary" sx={{ mr: 1, fontSize: 40 }} />
                  <Typography variant="h6">Upcoming</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                  {appointments.filter(appt => {
                    const appointmentDate = new Date(appt.date);
                    const today = new Date();
                    return appointmentDate > today;
                  }).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Future appointments
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PersonIcon color="primary" sx={{ mr: 1, fontSize: 40 }} />
                  <Typography variant="h6">Total Appointments</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                  {appointments.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  All scheduled appointments
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        {/* Appointments List */}
        <Paper sx={{ p: 3, borderRadius: '15px', mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Today's Appointments
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              New Appointment
            </Button>
          </Box>
          <List>
            {appointments.map((appointment, index) => (
              <React.Fragment key={appointment.id}>
                <ListItem
                  sx={{
                    bgcolor: index % 2 === 0 ? alpha(theme.palette.primary.main, 0.05) : 'transparent',
                    borderRadius: '10px',
                    mb: 1,
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {appointment.doctor}
                        </Typography>
                        <Chip
                          label={appointment.status}
                          color={appointment.status === 'Scheduled' ? 'success' : 'warning'}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="body2">
                          Patient: {appointment.patient}
                        </Typography>
                        <Typography variant="body2">
                          Time: {appointment.time} | Room: {appointment.room}
                        </Typography>
                        <Typography variant="body2">
                          Type: {appointment.type}
                        </Typography>
                      </Box>
                    }
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleEditClick(appointment)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDeleteAppointment(appointment.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                {index < appointments.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Container>

      {/* Add Appointment Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Schedule New Appointment
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Doctor Name"
                name="doctor"
                value={newAppointment.doctor}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Specialty"
                name="specialty"
                value={newAppointment.specialty}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient Name"
                name="patient"
                value={newAppointment.patient}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={newAppointment.date}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time"
                name="time"
                type="time"
                value={newAppointment.time}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Room"
                name="room"
                value={newAppointment.room}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Appointment Type</InputLabel>
                <Select
                  name="type"
                  value={newAppointment.type}
                  onChange={handleInputChange}
                  label="Appointment Type"
                >
                  <MenuItem value="Consultation">Consultation</MenuItem>
                  <MenuItem value="Follow-up">Follow-up</MenuItem>
                  <MenuItem value="Check-up">Check-up</MenuItem>
                  <MenuItem value="Emergency">Emergency</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddAppointment} variant="contained" color="primary">
            Schedule
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Appointment Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Edit Appointment
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Doctor Name"
                name="doctor"
                value={editingAppointment?.doctor || ''}
                onChange={handleEditInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Specialty"
                name="specialty"
                value={editingAppointment?.specialty || ''}
                onChange={handleEditInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Patient Name"
                name="patient"
                value={editingAppointment?.patient || ''}
                onChange={handleEditInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={editingAppointment?.date || ''}
                onChange={handleEditInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time"
                name="time"
                type="time"
                value={editingAppointment?.time || ''}
                onChange={handleEditInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Room"
                name="room"
                value={editingAppointment?.room || ''}
                onChange={handleEditInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Appointment Type</InputLabel>
                <Select
                  name="type"
                  value={editingAppointment?.type || ''}
                  onChange={handleEditInputChange}
                  label="Appointment Type"
                >
                  <MenuItem value="Consultation">Consultation</MenuItem>
                  <MenuItem value="Follow-up">Follow-up</MenuItem>
                  <MenuItem value="Check-up">Check-up</MenuItem>
                  <MenuItem value="Emergency">Emergency</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateAppointment} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Schedule; 