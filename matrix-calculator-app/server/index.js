const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:8080']
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../src')));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// API Routes for Matrix Calculator
app.post('/api/v1/matrix/calculate', (req, res) => {
  try {
    const { operation, matrices } = req.body;
    console.log('Matrix calculation request:', { operation, matrices });
    
    // Here you would implement matrix calculations
    // For now, returning a placeholder response
    res.json({
      success: true,
      data: {
        result: "Matrix calculation result will be implemented",
        operation,
        matrices
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// API Routes for Equation Solver
app.post('/api/v1/equations/solve', (req, res) => {
  try {
    const { equations, unknowns } = req.body;
    console.log('Equation solving request:', { equations, unknowns });
    
    // Here you would implement equation solving
    // For now, returning a placeholder response
    res.json({
      success: true,
      data: {
        result: "Equation solving result will be implemented",
        equations,
        unknowns
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Matrix Calculator API is running',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || '1.0.0'
  });
});

// Serve the main application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Matrix Calculator App running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔧 API Base URL: ${process.env.API_BASE_URL || `http://localhost:${PORT}/api`}`);
  console.log(`📝 Debug Mode: ${process.env.ENABLE_DEBUG_MODE || 'false'}`);
});

module.exports = app;
