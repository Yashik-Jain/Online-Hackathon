const express = require('express');
const router = express.Router();
const Audit = require('../models/Audit');

// Get all audit logs
router.get('/', async (req, res) => {
  try {
    const logs = await Audit.find().sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get audit logs by entity type
router.get('/:entityType', async (req, res) => {
  try {
    const logs = await Audit.find({ entityType: req.params.entityType })
      .sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get audit logs by entity ID
router.get('/entity/:id', async (req, res) => {
  try {
    const logs = await Audit.find({ entityId: req.params.id })
      .sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 