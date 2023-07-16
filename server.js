const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Pawnee225',
  database: 'balance_db',
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to handle adding a user
app.post('/addUser', (req, res) => {
  const { user } = req.body;

  if (!user) {
    return res.status(400).json({ success: false, message: 'Please provide a user name.' });
  }

  const insertQuery = 'INSERT INTO balances (user, balance) VALUES (?, 0)';
  connection.query(insertQuery, [user], (error, results) => {
    if (error) {
      console.error('Error adding user to the database:', error);
      res.status(500).json({ success: false, message: 'Error adding user to the database.' });
    } else {
      res.json({ success: true, message: 'Child added successfully.' });
    }
  });
});

// Route to handle fetching the balance list
app.get('/getBalances', (req, res) => {
  const selectQuery = 'SELECT * FROM balances ORDER BY user ASC';
  connection.query(selectQuery, (error, results) => {
    if (error) {
      console.error('Error fetching balance list:', error);
      res.status(500).json({ success: false, message: 'Error fetching balance list.' });
    } else {
      res.json({ balances: results });
    }
  });
});

// Route to handle incrementing the balance of a user
app.post('/incrementBalance', (req, res) => {
  const { user } = req.body;

  if (!user) {
    return res.status(400).json({ success: false, message: 'Please provide a user name.' });
  }

  const updateQuery = 'UPDATE balances SET balance = balance + 1 WHERE user = ?';
  connection.query(updateQuery, [user], (error, results) => {
    if (error) {
      console.error('Error incrementing balance:', error);
      res.status(500).json({ success: false, message: 'Error incrementing balance.' });
    } else {
      res.json({ success: true, message: 'Balance incremented successfully.' });
    }
  });
});

// Route to handle decrementing the balance of a user
app.post('/decrementBalance', (req, res) => {
  const { user } = req.body;

  if (!user) {
    return res.status(400).json({ success: false, message: 'Please provide a user name.' });
  }

  const updateQuery = 'UPDATE balances SET balance = balance - 1 WHERE user = ?';
  connection.query(updateQuery, [user], (error, results) => {
    if (error) {
      console.error('Error decrementing balance:', error);
      res.status(500).json({ success: false, message: 'Error decrementing balance.' });
    } else {
      res.json({ success: true, message: 'Balance decremented successfully.' });
    }
  });
});

// Route to handle removing a user
app.post('/clearUser', (req, res) => {
  const { user } = req.body;

  if (!user) {
    return res.status(400).json({ success: false, message: 'Please provide a user name.' });
  }

  const deleteQuery = 'DELETE FROM balances WHERE user = ?';
  connection.query(deleteQuery, [user], (error, results) => {
    if (error) {
      console.error('Error removing user:', error);
      res.status(500).json({ success: false, message: 'Error removing user.' });
    } else {
      res.json({ success: true, message: 'Child removed successfully.' });
    }
  });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});