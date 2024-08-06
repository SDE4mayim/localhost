const Sequelize = require("sequelize");
const sequelize = new Sequelize('testpetdb', 'testpetdb', 'testpetdb', {
  host: 'db4free.net',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,     
    min: 0,     
    idle: 10000
  }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.articles = require("./article.model")(sequelize, Sequelize);
db.profiles = require("./profiles.model")(sequelize,Sequelize);
db.users = require("./user.model")(sequelize,Sequelize);
module.exports = db;