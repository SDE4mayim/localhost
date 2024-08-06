// routes/diagnosis.routes.js
const auth = require("../middleware/auth");

module.exports = app => {
  const diagnosis = require("../controllers/diagnosis.controller.js");

  var router = require("express").Router();

  // Create a new diagnosis
  router.post("/", diagnosis.create);

  // Retrieve a single diagnosis with id
  router.get("/:id", auth, diagnosis.findOne);
  router.get("/", diagnosis.findAll);

  // Update a diagnosis with id
  router.put("/:id", diagnosis.update);

  // Delete a diagnosis with id
  router.delete("/:id", diagnosis.delete);

   // Enable a profile with id
   router.put("/enable/:id", auth, diagnosis.enable);

   // Disable a profile with id
   router.put("/disable/:id", auth, diagnosis.disable);

  app.use('/api/diagnosis', router);
};
