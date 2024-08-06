const auth = require("../middleware/auth");

module.exports = app => {
  const vaccination = require("../controllers/vaccinations.controller.js");

  var router = require("express").Router();

  // Create a new vaccination
  router.post("/", auth, vaccination.create);

  // Retrieve a single vaccination with id
  router.get("/:id", auth, vaccination.findOne);

  // Update a vaccination with id
  router.put("/:id", auth, vaccination.update);

  // Delete a vaccination with id
  router.delete("/:id", auth, vaccination.delete);

  app.use('/api/vaccination', router);
};
