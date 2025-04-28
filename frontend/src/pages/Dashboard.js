import React, { useState, useEffect } from 'react';
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
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  People as PeopleIcon,
  Bed as BedIcon,
  LocalHospital as HospitalIcon,
  AccessTime as TimeIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  Notifications as NotificationsIcon,
  CalendarToday as CalendarIcon,
  ArrowForward as ArrowForwardIcon,
  LocalPharmacy as PharmacyIcon,
  Healing as HealingIcon,
  Emergency as EmergencyIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const QuickActionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '15px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  background: theme.palette.background.paper,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  },
}));

const NotificationCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '15px',
  background: theme.palette.background.paper,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  marginBottom: theme.spacing(2),
}));

function Dashboard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [appointments] = useState([]);
  const [beds, setBeds] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [notifications] = useState([
    { id: 1, message: 'New patient admission request', time: '5 minutes ago', priority: 'high' },
    { id: 2, message: 'Bed #203 needs cleaning', time: '15 minutes ago', priority: 'medium' },
    { id: 3, message: 'Patient discharge scheduled', time: '30 minutes ago', priority: 'low' },
  ]);

  useEffect(() => {
    fetchBeds();
    fetchPatients();
    const interval = setInterval(() => {
      fetchBeds();
      fetchPatients();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchBeds = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/beds');
      setBeds(response.data);
    } catch (error) {
      console.error('Error fetching beds:', error);
    }
  };

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

  const quickActions = [
    {
      icon: <PeopleIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Admit Patient',
      action: () => navigate('/patients'),
    },
    {
      icon: <BedIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Manage Beds',
      action: () => navigate('/beds'),
    },
    {
      icon: <CalendarIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Schedule',
      action: () => navigate('/schedule'),
    },
    {
      icon: <PharmacyIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Pharmacy',
      action: () => navigate('/pharmacy'),
    },
  ];

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
            <HospitalIcon fontSize="large" />
            Hospital Management Dashboard
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
            Welcome to your hospital management system
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Left side - Stats and Quick Actions */}
          <Grid item xs={12} md={8}>
            {/* Stats Section */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={4}>
                <StyledCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <PeopleIcon color="primary" sx={{ mr: 1, fontSize: 40 }} />
                      <Typography variant="h6">Admitted Patients</Typography>
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                      {loading ? (
                        <CircularProgress size={24} />
                      ) : (
                        patients.filter(patient => patient.status === 'admitted').length
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Currently in care
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
              <Grid item xs={12} md={4}>
                <StyledCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <BedIcon color="primary" sx={{ mr: 1, fontSize: 40 }} />
                      <Typography variant="h6">Available Beds</Typography>
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                      {loading ? (
                        <CircularProgress size={24} />
                      ) : (
                        beds.filter(bed => bed.status === 'available').length
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Out of {loading ? '...' : beds.length} total
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
              <Grid item xs={12} md={4}>
                <StyledCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <TimeIcon color="primary" sx={{ mr: 1, fontSize: 40 }} />
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
            </Grid>

            {/* Today's Appointments Section */}
            <Paper sx={{ p: 3, borderRadius: '15px', mb: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Today's Appointments
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CalendarIcon />}
                  onClick={() => navigate('/schedule')}
                >
                  View All
                </Button>
              </Box>
              <List>
                {appointments
                  .filter(appt => {
                    const appointmentDate = new Date(appt.date);
                    const today = new Date();
                    return appointmentDate.toDateString() === today.toDateString();
                  })
                  .map((appointment, index) => (
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
                      </ListItem>
                      {index < appointments.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                {appointments.filter(appt => {
                  const appointmentDate = new Date(appt.date);
                  const today = new Date();
                  return appointmentDate.toDateString() === today.toDateString();
                }).length === 0 && (
                  <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', py: 2 }}>
                    No appointments scheduled for today
                  </Typography>
                )}
              </List>
            </Paper>

            {/* Quick Actions */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  {quickActions.map((action, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <QuickActionCard onClick={action.action}>
                        {action.icon}
                        <Typography
                          variant="h6"
                          sx={{ mt: 2, fontWeight: 'bold' }}
                        >
                          {action.title}
                        </Typography>
                      </QuickActionCard>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Right side - Hospital Logo */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                height: '100%',
                p: 3,
                borderRadius: '15px',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                src="https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg"
                alt="Hospital Logo"
                sx={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'contain',
                  mb: 2,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  textAlign: 'center',
                  color: theme.palette.primary.main,
                  fontWeight: 'bold',
                }}
              >
                Healthcare Excellence
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: 'center',
                  color: 'text.secondary',
                  mt: 1,
                }}
              >
                Providing quality care since 1990
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard; 