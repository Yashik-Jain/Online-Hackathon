const express = require('express');
const router = express.Router();
const Bed = require('../models/Bed');
const Audit = require('../models/Audit');

// Get all beds
router.get('/', async (req, res) => {
  try {
    const beds = await Bed.find().populate('patientId');
    res.json(beds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new bed
router.post('/', async (req, res) => {
  const bed = new Bed({
    bedNumber: req.body.bedNumber,
    ward: req.body.ward
  });

  try {
    const newBed = await bed.save();
    
    // Log the action
    const audit = new Audit({
      action: 'bed_update',
      entityType: 'bed',
      entityId: newBed._id,
      details: `Bed ${newBed.bedNumber} created in ${newBed.ward}`,
      user: 'system'
    });
    await audit.save();

    res.status(201).json(newBed);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update bed status
router.put('/:id', async (req, res) => {
  try {
    const bed = await Bed.findById(req.params.id);
    if (!bed) {
      return res.status(404).json({ message: 'Bed not found' });
    }

    const oldStatus = bed.status;
    bed.status = req.body.status;
    bed.lastUpdated = Date.now();

    const updatedBed = await bed.save();

    // Log the action
    const audit = new Audit({
      action: 'bed_update',
      entityType: 'bed',
      entityId: bed._id,
      details: `Bed ${bed.bedNumber} status changed from ${oldStatus} to ${bed.status}`,
      user: 'system'
    });
    await audit.save();

    res.json(updatedBed);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 