const express = require('express');
const router = express.Router();
const { generateQRCode, decodeQRCode } = require('../controllers/qrController');

// Generate a QR Code
router.post('/generate', generateQRCode);

// Decode a QR Code
router.post('/decode', decodeQRCode);

module.exports = router;
