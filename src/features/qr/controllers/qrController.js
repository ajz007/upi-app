const { generateQRCodeService, decodeQRCodeService } = require('../services/qrService');

// Controller to generate a QR Code
const generateQRCode = async (req, res) => {
  const { data } = req.body;
  try {
    const qrCode = await generateQRCodeService(data);
    res.json({ success: true, qrCode });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller to decode a QR Code
const decodeQRCode = (req, res) => {
  const { data } = req.body;
  try {
    const result = decodeQRCodeService(data);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { generateQRCode, decodeQRCode };
