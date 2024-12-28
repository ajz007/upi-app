const { fetchBalanceFromPSP } = require('../services/balanceService');

// Balance Inquiry Controller
const getBalance = async (req, res) => {
  const { vpa } = req.body;

  if (!vpa) {
    return res.status(400).json({ success: false, message: 'VPA is required' });
  }

  try {
    const balance = await fetchBalanceFromPSP(vpa);

    if (!balance) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }

    res.status(200).json({
      success: true,
      balance: {
        account: vpa,
        amount: balance.amount,
        currency: balance.currency,
        lastUpdated: balance.lastUpdated,
      },
    });
  } catch (error) {
    console.error('Error in getBalance:', error.message);
    res.status(500).json({ success: false, message: 'Failed to retrieve balance' });
  }
};

module.exports = { getBalance };
