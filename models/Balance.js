const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Adjust the path based on your project structure

const Balance = sequelize.define('Balance', {
  user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  balance: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

module.exports = Balance;