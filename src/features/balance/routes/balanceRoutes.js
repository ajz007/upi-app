const express = require('express');
const router = express.Router();
const { getBalance } = require('../controllers/balanceController');

// Balance Inquiry
router.post('/', getBalance);

module.exports = router;
