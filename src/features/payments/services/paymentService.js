const Payment = require('../models/paymentModel');
const { v4: uuidv4 } = require('uuid'); // For generating transaction IDs

// Simulate PSP API call
const simulatePSPTransaction = async (fromVPA, toVPA, amount) => {
  // Simulated logic
  if (Math.random() > 0.1) { // Simulate 90% success rate
    return { success: true };
  } else {
    throw new Error('Simulated PSP failure');
  }
};

const processPayment = async ({ fromVPA, toVPA, amount, remarks }) => {
  const transactionId = uuidv4();

  // Create initial transaction record
  const payment = new Payment({
    transactionId,
    fromVPA,
    toVPA,
    amount,
    remarks,
  });
  await payment.save();

  try {
    // Simulate PSP API call
    await simulatePSPTransaction(fromVPA, toVPA, amount);

    // Update transaction status to Success
    payment.status = 'Success';
    await payment.save();

    return { success: true, transactionId };
  } catch (error) {
    console.error('Error in processPayment:', error.message); // Log errors
    // Update transaction status to Failed
    payment.status = 'Failed';
    payment.errorMessage = error.message;
    await payment.save();

    return { success: false, message: error.message };
  }
};

module.exports = { processPayment };
