const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Adjust the path based on your project structure

const Balance = sequelize.define('Balance', {
  name: {
    type: DataTypes.STRING,
    // allowNull: false
  },
  balance: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  child_id:{
    type: DataTypes.INTEGER, 
    references: {
      model: 'children',
      key: 'id'
    }
  }
})

module.exports = Balance;