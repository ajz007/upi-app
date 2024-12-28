const { processPayment } = require('../services/paymentService');
const Payment = require('../models/paymentModel');

const initiatePayment = async (req, res) => {
  const { fromVPA, toVPA, amount, remarks } = req.body;

  if (!fromVPA || !toVPA || !amount) {
    return res.status(400).json({ success: false, message: 'Invalid input' });
  }

  if (amount <= 0) {
    return res.status(400).json({ success: false, message: 'Amount must be greater than zero' });
  }

  try {
    const result = await processPayment({ fromVPA, toVPA, amount, remarks });
    if (result.success) {
      res.status(200).json({ success: true, transactionId: result.transactionId });
    } else {
      res.status(500).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Payment processing failed' });
  }
};
  
  module.exports = { initiatePayment };
  
