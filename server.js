const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize'); // Import the sequelize instance
const balanceDataRoutes = require('./routes/balances'); // Adjust the path

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the route module for a specific path
app.use('/balance', balanceDataRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Sync Sequelize models with the database and start the server
Sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
});