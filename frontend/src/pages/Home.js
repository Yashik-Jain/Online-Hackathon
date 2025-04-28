import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  useTheme,
  alpha,
  styled,
  Paper,
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  People as PeopleIcon,
  Bed as BedIcon,
  AccessTime as TimeIcon,
  MedicalServices as ServicesIcon,
  Security as SecurityIcon,
  ArrowForward as ArrowForwardIcon,
  Healing as HealingIcon,
  LocalPharmacy as PharmacyIcon,
  Emergency as EmergencyIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  position: 'relative',
}));

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

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  textTransform: 'none',
  padding: '12px 30px',
  fontWeight: 600,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(-2px)',
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '15px',
  background: theme.palette.background.paper,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  },
}));

const ServiceCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '15px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  },
}));

function Home() {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: <PeopleIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />,
      title: 'Patient Management',
      description: 'Efficiently manage patient admissions, discharges, and transfers with our comprehensive system.',
    },
    {
      icon: <BedIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />,
      title: 'Bed Management',
      description: 'Real-time tracking of bed availability and occupancy status across all departments.',
    },
    {
      icon: <TimeIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />,
      title: '24/7 Monitoring',
      description: 'Round-the-clock patient monitoring and care coordination for better outcomes.',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 50, color: theme.palette.primary.main }} />,
      title: 'Secure Data',
      description: 'Advanced security measures to protect patient information and ensure compliance.',
    },
  ];

  const services = [
    {
      icon: <HealingIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'General Medicine',
      description: 'Comprehensive care for all your medical needs',
    },
    {
      icon: <EmergencyIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Emergency Care',
      description: '24/7 emergency services with rapid response',
    },
    {
      icon: <PharmacyIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Pharmacy Services',
      description: 'Full-service pharmacy with expert consultation',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                Advanced Healthcare Management
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: 'rgba(255,255,255,0.9)',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                Streamline your hospital operations with our comprehensive management solution
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <StyledButton
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/patients')}
                >
                  Get Started
                </StyledButton>
                <StyledButton
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => navigate('/beds')}
                >
                  Learn More
                </StyledButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PeopleIcon color="primary" sx={{ mr: 1, fontSize: 40 }} />
                    <Typography variant="h6">Total Patients</Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    1,234
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Patients
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={3}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BedIcon color="primary" sx={{ mr: 1, fontSize: 40 }} />
                    <Typography variant="h6">Available Beds</Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    45
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ready for Admission
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={3}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ServicesIcon color="primary" sx={{ mr: 1, fontSize: 40 }} />
                    <Typography variant="h6">Departments</Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    12
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Specialized Units
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={3}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TimeIcon color="primary" sx={{ mr: 1, fontSize: 40 }} />
                    <Typography variant="h6">Response Time</Typography>
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    5 min
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Average Response
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box sx={{ py: 8, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: theme.palette.primary.main,
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ mb: 6, color: 'text.secondary' }}
          >
            Comprehensive healthcare services for all your needs
          </Typography>
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <ServiceCard>
                  {service.icon}
                  <Typography
                    variant="h5"
                    sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}
                  >
                    {service.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {service.description}
                  </Typography>
                </ServiceCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: theme.palette.primary.main,
            }}
          >
            Key Features
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ mb: 6, color: 'text.secondary' }}
          >
            Discover what makes our system stand out
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <FeatureCard>
                  {feature.icon}
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box sx={{ py: 8, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: 'center',
              p: 6,
              borderRadius: '15px',
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: theme.palette.primary.main,
              }}
            >
              Ready to Get Started?
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 4, color: 'text.secondary' }}
            >
              Join us in revolutionizing hospital management
            </Typography>
            <StyledButton
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/patients')}
            >
              Start Managing Patients
            </StyledButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Home; 