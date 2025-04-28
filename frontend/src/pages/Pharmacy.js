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
  LocalPharmacy as PharmacyIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
  Inventory as InventoryIcon,
  Medication as MedicationIcon,
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

function Pharmacy() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [medications, setMedications] = useState([]);

  const [newMedication, setNewMedication] = useState({
    name: '',
    category: '',
    quantity: '',
    expiryDate: '',
    supplier: '',
    price: '',
  });

  const [editingMedication, setEditingMedication] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedication({ ...newMedication, [name]: value });
  };

  const handleAddMedication = () => {
    if (!newMedication.name || !newMedication.category || !newMedication.quantity || !newMedication.expiryDate) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error',
      });
      return;
    }

    const medication = {
      id: medications.length + 1,
      ...newMedication,
      status: parseInt(newMedication.quantity) > 300 ? 'In Stock' : 'Low Stock',
    };

    setMedications([...medications, medication]);
    setNewMedication({
      name: '',
      category: '',
      quantity: '',
      expiryDate: '',
      supplier: '',
      price: '',
    });
    setOpenDialog(false);
    setSnackbar({
      open: true,
      message: 'Medication added successfully',
      severity: 'success',
    });
  };

  const handleDeleteMedication = (id) => {
    setMedications(medications.filter(medication => medication.id !== id));
    setSnackbar({
      open: true,
      message: 'Medication deleted successfully',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleEditClick = (medication) => {
    setEditingMedication(medication);
    setEditDialog(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingMedication({ ...editingMedication, [name]: value });
  };

  const handleUpdateMedication = () => {
    if (!editingMedication.name || !editingMedication.category || !editingMedication.quantity || !editingMedication.expiryDate) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error',
      });
      return;
    }

    const updatedMedication = {
      ...editingMedication,
      status: parseInt(editingMedication.quantity) > 300 ? 'In Stock' : 'Low Stock',
    };

    setMedications(medications.map(med => 
      med.id === updatedMedication.id ? updatedMedication : med
    ));

    setEditDialog(false);
    setEditingMedication(null);
    setSnackbar({
      open: true,
      message: 'Medication updated successfully',
      severity: 'success',
    });
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
            <PharmacyIcon fontSize="large" />
            Pharmacy Management
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
            Manage medications and inventory
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <MedicationIcon color="primary" sx={{ mr: 1, fontSize: 40 }} />
                  <Typography variant="h6">Total Medications</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                  {medications.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Different types available
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <InventoryIcon color="primary" sx={{ mr: 1, fontSize: 40 }} />
                  <Typography variant="h6">In Stock Items</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                  {medications.filter(med => med.status === 'In Stock').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Available for use
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WarningIcon color="primary" sx={{ mr: 1, fontSize: 40 }} />
                  <Typography variant="h6">Low Stock Items</Typography>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                  {medications.filter(med => med.status === 'Low Stock').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Needs attention
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        {/* Medications List */}
        <Paper sx={{ p: 3, borderRadius: '15px', mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Current Inventory
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Add Medication
            </Button>
          </Box>
          <List>
            {medications.map((medication, index) => (
              <React.Fragment key={medication.id}>
                <ListItem
                  sx={{
                    bgcolor: index % 2 === 0 ? alpha(theme.palette.primary.main, 0.05) : 'transparent',
                    borderRadius: '10px',
                    mb: 1,
                  }}
                >
                  <ListItemIcon>
                    <MedicationIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {medication.name}
                        </Typography>
                        <Chip
                          label={medication.status}
                          color={getStatusColor(medication.status)}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="body2">
                          Category: {medication.category}
                        </Typography>
                        <Typography variant="body2">
                          Quantity: {medication.quantity} | Price: {medication.price}
                        </Typography>
                        <Typography variant="body2">
                          Expiry: {medication.expiryDate} | Supplier: {medication.supplier}
                        </Typography>
                      </Box>
                    }
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      color="primary" 
                      onClick={() => handleEditClick(medication)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => handleDeleteMedication(medication.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                {index < medications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Container>

      {/* Add Medication Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Add New Medication
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Medication Name"
                name="name"
                value={newMedication.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={newMedication.category}
                  onChange={handleInputChange}
                  label="Category"
                  required
                >
                  <MenuItem value="Pain Relief">Pain Relief</MenuItem>
                  <MenuItem value="Antibiotic">Antibiotic</MenuItem>
                  <MenuItem value="Blood Pressure">Blood Pressure</MenuItem>
                  <MenuItem value="Diabetes">Diabetes</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={newMedication.quantity}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                name="expiryDate"
                type="date"
                value={newMedication.expiryDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Supplier"
                name="supplier"
                value={newMedication.supplier}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={newMedication.price}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddMedication} variant="contained" color="primary">
            Add Medication
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Medication Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Edit Medication
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Medication Name"
                name="name"
                value={editingMedication?.name || ''}
                onChange={handleEditInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={editingMedication?.category || ''}
                  onChange={handleEditInputChange}
                  label="Category"
                  required
                >
                  <MenuItem value="Pain Relief">Pain Relief</MenuItem>
                  <MenuItem value="Antibiotic">Antibiotic</MenuItem>
                  <MenuItem value="Blood Pressure">Blood Pressure</MenuItem>
                  <MenuItem value="Diabetes">Diabetes</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={editingMedication?.quantity || ''}
                onChange={handleEditInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                name="expiryDate"
                type="date"
                value={editingMedication?.expiryDate || ''}
                onChange={handleEditInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Supplier"
                name="supplier"
                value={editingMedication?.supplier || ''}
                onChange={handleEditInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={editingMedication?.price || ''}
                onChange={handleEditInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateMedication} variant="contained" color="primary">
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

export default Pharmacy; 