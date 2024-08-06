const auth = require("../middleware/auth");

module.exports = app => {  
    const hospital = require("../controllers/hospital.controller.js");
    
    var router = require("express").Router();  
    
    // Create a new profile
    router.post("/", hospital.create);  
    
    // Retrieve a single profile with id
    router.get("/:id", auth, hospital.findOne);
    router.get("/", auth, hospital.findAll);    
    
    // Update a profile with id
    router.put("/:id", auth, hospital.update);  
    
    // Delete a profile with id
    router.delete("/:id", auth, hospital.delete); 
    
    // Enable a profile with id
  router.put("/enable/:id", auth, hospital.enable);  
    
  // Disable a profile with id
  router.put("/disable/:id", auth, hospital.disable); 
    
    app.use('/api/hospital', router);
  };
  