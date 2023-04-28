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
  },
  status: DataTypes.INTEGER
}, {
  // Other model options go here
  // hooks: {
  //   beforeValidate: (user, options) => {
  //     user.status = 1;
  //   },
  //   afterValidate: (user, options) => {
  //     user.lastName = 'okkaaaaaaaa';
  //   }
  // },
  tableName:"users",
  paranoid:true,
  deletedAt:'soft_delete',
  underscored: true
});

// User.addHook('beforeValidate', (user, options) => {
//   user.status = 1;
// });

// User.addHook('afterValidate', 'someCustomName', (user, options) => {
//   user.lastName = 'okkdwdwdwdwdwdaaaaaaaa';
// });

// User.beforeValidate(async (user, options) => {
//   user.lastName = 'ppppppppppppp';
// });

// User.afterValidate('myHookAfter', (user, options) => {
//   user.status = 1;
// });

return User

}
