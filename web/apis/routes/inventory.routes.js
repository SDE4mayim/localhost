const auth = require("../middleware/auth");

module.exports = app => {  
    const inventory = require("../controllers/inventory.controller.js");
    
    var router = require("express").Router();  
    
    // Create a new profile
    router.post("/", inventory.create);  
    
    // Retrieve a single profile with id
    router.get("/:id", auth, inventory.findOne);  
    router.get("/", auth, inventory.findAll);  
    
    // Update a profile with id
    router.put("/:id", inventory.update);  
    
    // Delete a profile with id
    router.delete("/:id", inventory.delete);  
    
    app.use('/api/inventory', router);
  };
  