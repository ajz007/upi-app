const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true },
  fromVPA: { type: String, required: true },
  toVPA: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' }, // Default to INR
  remarks: { type: String },
  status: { type: String, default: 'Pending' },
  timestamp: { type: Date, default: Date.now },
  errorMessage: { type: String },
});

module.exports = mongoose.model('Payment', paymentSchema);
