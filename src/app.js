const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const qrRoutes = require('./features/qr/routes/qrRoutes'); // Import QR routes
const paymentRoutes = require('./features/payments/routes/paymentRoutes');
const balanceRoutes = require('./features/balance/routes/balanceRoutes');
const historyRoutes = require('./features/history/routes/historyRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/qr', qrRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/balance', balanceRoutes);
app.use('/api/history', historyRoutes);



// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the full error stack to the terminal
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  });

module.exports = app;
