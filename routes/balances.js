const express = require('express');
const router = express.Router();
const { Balance, Child } = require('../models/'); // Import the Sequelize model

// Route to add a child
router.post('/balance/addChild', async (req, res) => {
  const { childName } = req.body;

  if (!childName) {
    return res.status(400).json({ success: false, message: 'Please provide a child name.' });
  }

  try {
    const newBalance = await Child.create({ name: childName });
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

router.get('/balance/getData', async (req, res) => {
  try {
    const childData = await Child.findAll({})
    console.log(childData);
    res.status(200).json(childData);
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;

// local storage get to render information to the page
// get fetch in public/index.js 
// take names, render those in html
// append