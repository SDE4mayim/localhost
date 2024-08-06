const auth = require("../middleware/auth");

module.exports = app => {  
    const petManagement = require("../controllers/pet_management.controller.js");
    
    var router = require("express").Router();  
    
    // Create a new profile
    router.post("/", petManagement.create);  
    
    // Retrieve a single profile with id
    router.get("/:id", auth, petManagement.findOne); 
    router.get("/", petManagement.findAll); 

    
    // Update a profile with id
    router.put("/:id", auth, petManagement.update);  
    
    // Delete a profile with id
    router.delete("/:id", auth, petManagement.delete); 
    
      // Enable a profile with id
      router.put("/enable/:id", auth, petManagement.enable);  
    
      // Disable a profile with id
      router.put("/disable/:id", auth, petManagement.disable); 
    
    app.use('/api/petManagement', router);
  };
  