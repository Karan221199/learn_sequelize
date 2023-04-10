const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('learn_sequelize', 'root', '', {
    host: 'localhost',
    logging:false,
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
//hello
const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize,DataTypes)
db.contact = require('./contact')(sequelize,DataTypes,Model)

db.sequelize.sync({force:false})

module.exports = db