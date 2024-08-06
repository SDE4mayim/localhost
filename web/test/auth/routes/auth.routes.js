
module.exports = app => {  
    const auth = require("../controllers/auth.controller.js");
    
    var router = require("express").Router();  // Create a new Article
    router.post("/signup", auth.signup);  // Retrieve a single Article with id
    router.post("/login", auth.signin);  // Update a Article with id
    //router.put("/:id", articles.update);  // Delete a Article with id
    //router.delete("/:id", articles.delete);  
    app.use('/api/auth', router);
  };
  