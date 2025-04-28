const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Bed = require('../models/Bed');
const Audit = require('../models/Audit');

// Get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find().populate('bedId');
    res.json(patients);
  } catch (err) {
    console.error('Error fetching patients:', err);
    res.status(500).json({ message: 'Error fetching patients', error: err.message });
  }
});

// Admit new patient
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    const { name, age, gender, condition, priority } = req.body;
    if (!name || !age || !gender || !condition) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create patient object
    const patient = new Patient({
      name,
      age: parseInt(age),
      gender,
      condition,
      priority: priority || 'medium',
      status: 'admitted'
    });

    // Find available bed
    const availableBed = await Bed.findOne({ status: 'available' });
    if (!availableBed) {
      return res.status(400).json({ message: 'No available beds' });
    }

    // Assign bed to patient
    patient.bedId = availableBed._id;
    const newPatient = await patient.save();

    // Update bed status
    availableBed.status = 'occupied';
    availableBed.patientId = newPatient._id;
    await availableBed.save();

    // Log the action
    const audit = new Audit({
      action: 'admission',
      entityType: 'patient',
      entityId: newPatient._id,
      details: `Patient ${newPatient.name} admitted to bed ${availableBed.bedNumber}`,
      user: 'system'
    });
    await audit.save();

    // Populate bed information in response
    const populatedPatient = await Patient.findById(newPatient._id).populate('bedId');
    res.status(201).json(populatedPatient);
  } catch (err) {
    console.error('Error admitting patient:', err);
    res.status(500).json({ message: 'Error admitting patient', error: err.message });
  }
});

// Discharge patient
router.put('/:id/discharge', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Update patient status
    patient.status = 'discharged';
    patient.actualDischargeDate = Date.now();

    // Free up the bed
    if (patient.bedId) {
      const bed = await Bed.findById(patient.bedId);
      if (bed) {
        bed.status = 'available';
        bed.patientId = null;
        await bed.save();
      }
    }

    const updatedPatient = await patient.save();

    // Log the action
    const audit = new Audit({
      action: 'discharge',
      entityType: 'patient',
      entityId: patient._id,
      details: `Patient ${patient.name} discharged`,
      user: 'system'
    });
    await audit.save();

    res.json(updatedPatient);
  } catch (err) {
    console.error('Error discharging patient:', err);
    res.status(500).json({ message: 'Error discharging patient', error: err.message });
  }
});

// Transfer patient to different bed
router.put('/:id/transfer', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const newBed = await Bed.findById(req.body.newBedId);
    if (!newBed || newBed.status !== 'available') {
      return res.status(400).json({ message: 'New bed not available' });
    }

    // Free up old bed
    if (patient.bedId) {
      const oldBed = await Bed.findById(patient.bedId);
      if (oldBed) {
        oldBed.status = 'available';
        oldBed.patientId = null;
        await oldBed.save();
      }
    }

    // Assign new bed
    patient.bedId = newBed._id;
    newBed.status = 'occupied';
    newBed.patientId = patient._id;
    await newBed.save();

    const updatedPatient = await patient.save();

    // Log the action
    const audit = new Audit({
      action: 'transfer',
      entityType: 'patient',
      entityId: patient._id,
      details: `Patient ${patient.name} transferred to bed ${newBed.bedNumber}`,
      user: 'system'
    });
    await audit.save();

    res.json(updatedPatient);
  } catch (err) {
    console.error('Error transferring patient:', err);
    res.status(500).json({ message: 'Error transferring patient', error: err.message });
  }
});

module.exports = router; 