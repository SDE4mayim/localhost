const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

var corsOptions = {
  origin: "http://localhost:5173" // URL of the frontend
  //origin: "https://vetcastle.com"
};


app.use(cors(corsOptions));
app.use(express.json()); // parsing application/json
app.use('/profile', express.static(path.join(__dirname, 'upload/images')));
app.use(express.urlencoded({ extended: true })); 
const db = require("./models/index.js");
db.sequelize.sync();

//require("./routes/articles.routes.js")(app);
//require("./routes/profiles.routes.js")(app);
//require("./routes/users.routes.js")(app);
//require("./routes/auth.routes.js")(app);
require("./routes/uploads.routes.js")(app);
require("./routes/appointments.routes.js")(app);
require("./routes/auth.routes.js")(app);
require("./routes/doctor_management.routes.js")(app);
require("./routes/hospital.routes.js")(app);
require("./routes/hospital_category.routes.js")(app);
require("./routes/pet_management.routes.js")(app);
require("./routes/pet_owner_management.routes.js")(app);
require("./routes/pet_type.js")(app);
require("./routes/pet_type_mapping.js")(app);
require("./routes/profiles.routes.js")(app);
require("./routes/diagnosis.routes.js")(app);
require("./routes/vaccinations.routes.js")(app);
require("./routes/product_category.routes.js")(app);
require("./routes/products.routes.js")(app);
//require("./routes/salesbill.routes.js")(app);
//require("./routes/salesbilldetails.routes.js")(app);
//require("./routes/users.routes.js")(app);


// parsing application/x-www-form-urlencoded 
const PORT = process.env.PORT || 8070;  //port
app.listen(PORT, () => {
   console.log('Server is running on port ' + PORT + '.');
});