const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('learn_sequelize', 'root', '', {
    host: 'localhost',
    logging:true,
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize,DataTypes)
db.contact = require('./contact')(sequelize,DataTypes,Model)
db.education = require('./education')(sequelize,DataTypes,Model)
db.user_contacts = require('./userContacts')(sequelize,DataTypes,db.user,db.contact)

db.user.hasMany(db.contact,{foreignKey: 'UserId'});
db.contactUser = db.contact.belongsTo(db.user,{foreignKey: 'UserId', as:'users'})

db.contact.hasMany(db.education,{foreignKey: 'ContactId'});
db.education.belongsTo(db.contact,{oreignKey: 'ContactId'})

// db.user.belongsToMany(db.contact, { through: db.user_contacts });
// db.contact.belongsToMany(db.user, { through: db.user_contacts });

db.sequelize.sync({force:false})

module.exports = db