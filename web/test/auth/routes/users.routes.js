module.exports = app => {  
    const users = require("../controllers/users.controller.js");
    
    var router = require("express").Router();  // Create a new Article
    //router.post("/", articles.create);  // Retrieve a single Article with id
    router.get("/:id", users.findOne);  // Update a Article with id
    app.use('/api/users', router);
  };
  