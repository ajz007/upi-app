const express = require('express');
const router = express.Router();
const { initiatePayment } = require('../controllers/paymentController');

// Initiate Payment
router.post('/initiate', initiatePayment);

module.exports = router;
