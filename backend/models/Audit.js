const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
    enum: ['admission', 'discharge', 'transfer', 'bed_update', 'status_change']
  },
  entityType: {
    type: String,
    required: true,
    enum: ['patient', 'bed']
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Audit', auditSchema); 