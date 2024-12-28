const { generateQRCodeService, decodeQRCodeService } = require('../services/qrService');

describe('QR Service', () => {
  it('should generate a QR code', async () => {
    const data = 'upi://pay?pa=merchant@upi&am=100.00';
    const qrCode = await generateQRCodeService(data);
    expect(qrCode).toContain('data:image/png;base64');
  });

  it('should decode a QR code (placeholder)', () => {
    const data = 'dummy-data';
    const result = decodeQRCodeService(data);
    expect(result.success).toBe(true);
  });
});
