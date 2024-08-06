const auth = require("../middleware/auth");

module.exports = app => {  
    const petOwnerManagement = require("../controllers/pet_owner_management.controller.js");
    
    var router = require("express").Router();  
    
    // Create a new profile
    router.post("/", petOwnerManagement.create);  
    
    // Retrieve a single profile with id
    router.get("/:id", auth, petOwnerManagement.findOne);  
    router.get("/", petOwnerManagement.findAll);  
    
    // Update a profile with id
    router.put("/:id", auth, petOwnerManagement.update);  
    
    // Delete a profile with id
    router.delete("/:id", auth, petOwnerManagement.delete);  

    // Enable a profile with id
    router.put("/enable/:id", auth, petOwnerManagement.enable);  
    
    // Disable a profile with id
    router.put("/disable/:id", auth, petOwnerManagement.disable); 
    
    app.use('/api/petOwnerManagement', router);
  };
  