const Balance = require('./Balance');
const Child = require('./child');

Child.hasOne(Balance, {
    foreignKey: 'child_id',
    onDelete: 'cascade'
});

Balance.belongsTo(Child, {
    foreignKey: 'child_id'
});


module.exports = { Child, Balance };