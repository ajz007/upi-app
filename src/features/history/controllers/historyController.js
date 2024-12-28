const Payment = require('../../payments/models/paymentModel');

// Get Transaction Status
const getTransactionStatus = async (req, res) => {
    const { transactionId } = req.params;
  
    try {
      const transaction = await Payment.findOne({ transactionId });
  
      if (!transaction) {
        return res.status(404).json({ success: false, message: 'Transaction not found' });
      }
  
      res.status(200).json({ success: true, transaction });
    } catch (error) {
      console.error('Error in getTransactionStatus:', error.message);
      res.status(500).json({ success: false, message: 'Failed to retrieve transaction status' });
    }
  };

  // Get Transaction Status with filters
  const getFilteredTransactions = async (req, res) => {
    const { fromDate, toDate, fromVPA, toVPA, status, sort, order, limit = 10, page = 1 } = req.query;
  
    try {
      // Validation
      const allowedStatuses = ['Pending', 'Success', 'Failed'];
      const allowedSortFields = ['timestamp', 'amount'];
      const allowedOrders = ['asc', 'desc'];
  
      if (fromDate && isNaN(new Date(fromDate).getTime())) {
        return res.status(400).json({ success: false, message: 'Invalid fromDate' });
      }
      if (toDate && isNaN(new Date(toDate).getTime())) {
        return res.status(400).json({ success: false, message: 'Invalid toDate' });
      }
      if (status && !allowedStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status' });
      }
      if (sort && !allowedSortFields.includes(sort)) {
        return res.status(400).json({ success: false, message: 'Invalid sort field' });
      }
      if (order && !allowedOrders.includes(order)) {
        return res.status(400).json({ success: false, message: 'Invalid order value' });
      }
  
      // Build query
      const query = {};
      if (fromDate || toDate) {
        query.timestamp = {};
        if (fromDate) query.timestamp.$gte = new Date(fromDate);
        if (toDate) query.timestamp.$lte = new Date(toDate);
      }
      if (fromVPA) query.fromVPA = fromVPA;
      if (toVPA) query.toVPA = toVPA;
      if (status) query.status = status;
  
      // Pagination and sorting
      const skip = (Number(page) - 1) * Number(limit);
      const sortOrder = order === 'desc' ? -1 : 1;
  
      // Query the database
      const transactions = await Payment.find(query)
        .sort({ [sort || 'timestamp']: sortOrder }) // Default sort by timestamp
        .skip(skip)
        .limit(Number(limit));
  
      // Count total documents for metadata
      const totalDocuments = await Payment.countDocuments(query);
  
      res.status(200).json({
        success: true,
        metadata: {
          totalDocuments,
          totalPages: Math.ceil(totalDocuments / Number(limit)),
          currentPage: Number(page),
          limit: Number(limit),
        },
        transactions,
      });
    } catch (error) {
      console.error('Error in getFilteredTransactions:', error.message);
      res.status(500).json({ success: false, message: 'Failed to retrieve transactions' });
    }
  };

  // Get Transaction History
const getTransactionHistory = async (req, res) => {
    const { fromDate, toDate, fromVPA, toVPA, status, limit = 10, page = 1 } = req.query;
  
    try {
      // Build Query
      const query = {};
      if (fromDate || toDate) {
        query.timestamp = {};
        if (fromDate) query.timestamp.$gte = new Date(fromDate);
        if (toDate) query.timestamp.$lte = new Date(toDate);
      }
      if (fromVPA) query.fromVPA = fromVPA;
      if (toVPA) query.toVPA = toVPA;
      if (status) query.status = status;
  
      // Pagination
      const skip = (Number(page) - 1) * Number(limit);
  
      // Query the Database
      const transactions = await Payment.find(query)
        .sort({ timestamp: -1 }) // Sort by latest transactions
        .skip(skip)
        .limit(Number(limit));
  
      // Count Total Transactions
      const totalDocuments = await Payment.countDocuments(query);
  
      res.status(200).json({
        success: true,
        metadata: {
          totalTransactions: totalDocuments,
          totalPages: Math.ceil(totalDocuments / Number(limit)),
          currentPage: Number(page),
          limit: Number(limit),
        },
        transactions,
      });
    } catch (error) {
      console.error('Error in getTransactionHistory:', error.message);
      res.status(500).json({ success: false, message: 'Failed to retrieve transaction history' });
    }
  };

module.exports = { getTransactionStatus, getFilteredTransactions, getTransactionHistory };
