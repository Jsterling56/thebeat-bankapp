const express = require('express');
const router = express.Router();
const  Balance = require('../models//Balance'); // Import the Sequelize model

// Route to add a child
router.post('/addChild', async (req, res) => {
  const { childName } = req.body;

  if (!childName) {
    return res.status(400).json({ success: false, message: 'Please provide a child name.' });
  }

  try {
    const newBalance = await Balance.create({ user: childName, balance: 0 });
    res.json({ success: true, message: 'Child added successfully.', balance: newBalance });
  } catch (error) {
    console.error('Error adding child to the database:', error);
    res.status(500).json({ success: false, message: 'Error adding child to the database.' });
  }
});

// Route to delete a child
router.post('/deleteChild', async (req, res) => {
  const { childName } = req.body;

  if (!childName) {
    return res.status(400).json({ success: false, message: 'Please provide a child name.' });
  }

  try {
    await Balance.destroy({ where: { user: childName } });
    res.json({ success: true, message: 'Child deleted successfully.' });
  } catch (error) {
    console.error('Error deleting child from the database:', error);
    res.status(500).json({ success: false, message: 'Error deleting child from the database.' });
  }
});

// Route to increment the balance for a child
router.post('/incrementBalance', async (req, res) => {
  const { childName } = req.body;

  if (!childName) {
    return res.status(400).json({ success: false, message: 'Please provide a child name.' });
  }

  try {
    await Balance.increment('balance', { by: 1, where: { user: childName } });
    res.json({ success: true, message: 'Balance incremented successfully.' });
  } catch (error) {
    console.error('Error incrementing balance:', error);
    res.status(500).json({ success: false, message: 'Error incrementing balance.' });
  }
});

// Route to decrement the balance for a child
router.post('/decrementBalance', async (req, res) => {
  const { childName } = req.body;

  if (!childName) {
    return res.status(400).json({ success: false, message: 'Please provide a child name.' });
  }

  try {
    await Balance.decrement('balance', { by: 1, where: { user: childName } });
    res.json({ success: true, message: 'Balance decremented successfully.' });
  } catch (error) {
    console.error('Error decrementing balance:', error);
    res.status(500).json({ success: false, message: 'Error decrementing balance.' });
  }
});

module.exports = router;