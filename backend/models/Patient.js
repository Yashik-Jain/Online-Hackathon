const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  admissionDate: {
    type: Date,
    default: Date.now
  },
  expectedDischargeDate: {
    type: Date
  },
  actualDischargeDate: {
    type: Date
  },
  condition: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  bedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bed',
    default: null
  },
  status: {
    type: String,
    enum: ['admitted', 'discharged', 'transferred'],
    default: 'admitted'
  }
});

module.exports = mongoose.model('Patient', patientSchema); 