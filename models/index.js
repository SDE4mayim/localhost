const Sequelize = require("sequelize");
const sequelize = new Sequelize('tfeiamho_vetcastle', 'root', '1Time@p!', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  define: {
    timestamps: false
},
  pool: {
    max: 5,     
    min: 0,     
    idle: 10000
  }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.profiles = require("./profiles.model")(sequelize,Sequelize);
db.users = require("./user.model")(sequelize,Sequelize);
db.doctor_management = require("./doctor_management.model")(sequelize,Sequelize);
db.appointments = require("./appointments.model")(sequelize,Sequelize);
db.hospitals = require("./hospitals.model")(sequelize,Sequelize);
db.hospital_category = require("./hospital_category.model")(sequelize,Sequelize);
db.pet_management = require("./pet_management.model")(sequelize,Sequelize);
db.pet_owner_management = require("./pet_owner_management.model")(sequelize,Sequelize);
db.pet_type = require("./pet_type.model")(sequelize,Sequelize);
db.pet_type_mapping = require("./pet_type_mapping.model")(sequelize,Sequelize);
db.diagnosis = require("./diagnosis.model")(sequelize,Sequelize);
db.vaccinations = require("./vaccinations.model")(sequelize,Sequelize);
db.products = require("./products.model")(sequelize,Sequelize);
db.product_categories = require("./product_category.model")(sequelize,Sequelize);
db.salesbill = require("./salesbill.model")(sequelize,Sequelize);
db.salesbilldetails = require("./salesbilldetails.model")(sequelize,Sequelize);
module.exports = db;