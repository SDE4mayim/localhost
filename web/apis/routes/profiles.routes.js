const auth = require("../middleware/auth");

module.exports = app => {  
    const profiles = require("../controllers/profiles.controller.js");
    
    var router = require("express").Router();  
    
    // Create a new profile
    router.post("/", profiles.create);  
    
    // Retrieve a single profile with id
    router.get("/:id", auth, profiles.findOne);  
    
    // Update a profile with id
    router.put("/:id", auth, profiles.update);  
    
    // Delete a profile with id
    router.delete("/:id", auth, profiles.delete);  

    // Enable a profile with id
    router.put("/enable/:id", auth, profiles.enable);  
    
    // Disable a profile with id
    router.put("/disable/:id", auth, profiles.disable); 
    
    app.use('/api/profiles', router);
  };
  