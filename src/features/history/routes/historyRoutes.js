const express = require('express');
const router = express.Router();
const { getTransactionStatus, getFilteredTransactions, getTransactionHistory } = require('../controllers/historyController');

// Get Transaction Status
router.get('/status/:transactionId', getTransactionStatus);
router.get('/status', getFilteredTransactions);

// Get Transaction History
router.get('/transactions', getTransactionHistory);

module.exports = router;
