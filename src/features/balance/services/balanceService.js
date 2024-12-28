// Simulate PSP Balance Inquiry API
const fetchBalanceFromPSP = async (vpa) => {
    try {
      // Simulated balance response
      const mockResponse = {
        amount: 10000.50,
        currency: 'INR',
        lastUpdated: new Date().toISOString(),
      };
  
      // Simulate a delay (e.g., network or API response time)
      await new Promise((resolve) => setTimeout(resolve, 500));
  
      return mockResponse; // Replace with real PSP API integration
    } catch (error) {
      console.error('Error in fetchBalanceFromPSP:', error.message);
      throw new Error('Failed to fetch balance from PSP');
    }
  };
  
  module.exports = { fetchBalanceFromPSP };
  