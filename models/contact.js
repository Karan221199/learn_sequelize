module.exports = (sequelize,DataTypes,Model) => {
class Contact extends Model {}

Contact.init({
  // Model attributes are defined here
  permanent_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  current_address: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Contact' // We need to choose the model name
});

return Contact
}