module.exports = (sequelize,DataTypes) => {
const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
    validate:{
      isAlpha:true,
      isLowercase:true
    },
    get() {
      const rawValue = this.getDataValue('firstName');
      return rawValue ? rawValue.toUpperCase() : null;
    }
  },
  lastName: {
    type: DataTypes.STRING,
    set(value) {
      // Storing passwords in plaintext in the database is terrible.
      // Hashing the value with an appropriate cryptographic hash function is better.
      this.setDataValue('lastName', value+' ,Indian');
    }
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  tableName:"users",
  paranoid:true,
  deletedAt:'soft_delete'
});

return User

}
