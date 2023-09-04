const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./config/connection'); // Import the sequelize instance
const balanceDataRoutes = require('./routes/balances'); // Adjust the path
const Balance = require('./models/Balance');
const routes = require("./routes/balances")

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the route module for a specific path
app.use('/balance', balanceDataRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.post('/create-balance', async (req, res) => {
  try {
    const { user, balance } = req.body;
  
  const newBalance = await Balance.create({
    user, balance,
  });
res.status.apply(201).json(newBalance);
}catch (error){
  console.error('Error creating balance:', error);
  res.status(500).json({ error: 'Internal server error' });
}
});

// Serve index.html for all routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use(routes)
// Sync Sequelize models with the database and start the server
sequelize.sync({force: false}).then(() => {
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
}).catch((error) => {
  console.error('Error syncing database:', error);
});