const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Adjust the path as needed

const Child = sequelize.define('child', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  // balance_id:{
  //   type: DataTypes.INTEGER, 
  //   references: {
  //     model: 'Balance',
  //     key: 'id'
  //   }
  // }
},
// { 
//   sequelize,
//   modelName: 'child'
// }
);

module.exports = Child;