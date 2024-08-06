const auth = require("../middleware/auth");

module.exports = app => {
  const appointments = require("../controllers/appointments.controller.js");

  var router = require("express").Router();

  // Create a new profile
  router.post("/", appointments.create);

  // Retrieve a single profile with id
  router.get("/:id", auth, appointments.findOne);
  router.get("/", auth, appointments.findAll);

  // Update a profile with id
  router.put("/:id", appointments.update);

  // Delete a profile with id
  router.delete("/:id", appointments.delete);

  // Enable a profile with id
  router.put("/enable/:id", auth, appointments.enable);

  // Disable a profile with id
  router.put("/disable/:id", auth, appointments.disable);

  app.use('/api/appointments', router);
};
