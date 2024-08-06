const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:4200" // URL of the frontend
};
app.use(cors(corsOptions));
app.use(express.json()); // parsing application/json
app.use(express.urlencoded({ extended: true })); 
const db = require("./models/index.js");
db.sequelize.sync();

//require("./routes/articles.routes.js")(app);
require("./routes/profiles.routes.js")(app);
//require("./routes/users.routes.js")(app);
require("./routes/auth.routes.js")(app);
// parsing application/x-www-form-urlencoded 
const PORT = process.env.PORT || 8070;  //port
app.listen(PORT, () => {
   console.log('Server is running on port ' + PORT + '.');
});