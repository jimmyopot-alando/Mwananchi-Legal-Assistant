// backend/src/app.js

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
const authRoutes = require('./routes/auth');
const lawRoutes = require('./routes/laws');
const documentRoutes = require('./routes/documents');
const qnaRoutes = require('./routes/qna');
const paymentRoutes = require('./routes/payments');
const courtRoutes = require('./routes/courts');

app.use('/api/auth', authRoutes);
app.use('/api/laws', lawRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/qna', qnaRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/courts', courtRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mwananchi Legal Assistant backend running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
