const auth = require("../middleware/auth");

module.exports = app => {  
    const petType = require("../controllers/pet_type.controller.js");
    
    var router = require("express").Router();  
    
    // Create a new profile
    router.post("/", petType.create);  
    
    // Retrieve a single profile with id
    router.get("/:id", auth, petType.findOne);  
    router.get("/", petType.findAll);  
    
    // Update a profile with id
    router.put("/:id", petType.update);  
    
    // Delete a profile with id
    router.delete("/:id", petType.delete);  
    
    app.use('/api/petType', router);
  };
  