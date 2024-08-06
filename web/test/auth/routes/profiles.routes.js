const auth = require("../middleware/auth");

module.exports = app => {  
    const profiles = require("../controllers/profiles.controller.js");
    
    var router = require("express").Router();  // Create a new Article
    //router.post("/", articles.create);  // Retrieve a single Article with id
    router.get("/:id", auth, profiles.findOne);  // Update a Article with id
    //router.put("/:id", articles.update);  // Delete a Article with id
    //router.delete("/:id", articles.delete);  
    app.use('/api/profiles', router);
  };
  