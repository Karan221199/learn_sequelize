const { Sequelize, DataTypes, Model } = require('sequelize');
const Customer = require('./customer');

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
//hello
const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize,DataTypes)
db.contact = require('./contact')(sequelize,DataTypes,Model)
db.education = require('./education')(sequelize,DataTypes,Model)
db.user_contacts = require('./userContacts')(sequelize,DataTypes,db.user,db.contact)
db.customer = require('./customer')(sequelize,DataTypes)
db.profile = require('./profile')(sequelize,DataTypes)

db.user.hasMany(db.contact,{foreignKey: 'UserId'});
db.contactUser = db.contact.belongsTo(db.user,{foreignKey: 'UserId', as:'users'})

db.contact.hasMany(db.education,{foreignKey: 'ContactId'});
db.education.belongsTo(db.contact,{oreignKey: 'ContactId'})

// db.user.belongsToMany(db.contact, { through: db.user_contacts });
// db.contact.belongsToMany(db.user, { through: db.user_contacts });

const Grant = sequelize.define('grant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    selfGranted: DataTypes.BOOLEAN
}, { timestamps: false });

db.grant = Grant;

db.customer.belongsToMany(db.profile, { through: Grant ,uniqueKey: 'my_custom_unique'});
db.profile.belongsToMany(db.customer, { through: Grant ,uniqueKey: 'my_custom_unique'});

// // Setup a One-to-Many relationship between User and Grant
// db.customer.hasMany(db.grant);
// db.grant.belongsTo(db.customer);

// // Also setup a One-to-Many relationship between Profile and Grant
// db.profile.hasMany(db.grant);
// db.grant.belongsTo(db.profile);

db.player = sequelize.define('Player', { username: DataTypes.STRING });
db.team = sequelize.define('Team', { name: DataTypes.STRING });
db.game = sequelize.define('Game', { name: DataTypes.STRING });

db.gameTeam = sequelize.define('GameTeam', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
});

db.team.belongsToMany(db.game, { through: db.gameTeam });
db.game.belongsToMany(db.team, { through: db.gameTeam });
db.gameTeam.belongsTo(db.game);
db.gameTeam.belongsTo(db.team);
db.game.hasMany(db.gameTeam);
db.team.hasMany(db.gameTeam);


db.playerGameTeam = sequelize.define('PlayerGameTeam', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
});
db.player.belongsToMany(db.gameTeam, { through: db.playerGameTeam });
db.gameTeam.belongsToMany(db.player, { through: db.playerGameTeam });
db.playerGameTeam.belongsTo(db.player);
db.playerGameTeam.belongsTo(db.gameTeam);
db.player.hasMany(db.playerGameTeam);
db.gameTeam.hasMany(db.playerGameTeam);

db.sequelize.sync({force:true})

module.exports = db