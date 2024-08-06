const auth = require("../middleware/auth");

module.exports = app => {  
    const petTypeMapping = require("../controllers/pet_type_mapping.controller.js");
    
    var router = require("express").Router();  
    
    // Create a new profile
    router.post("/", petTypeMapping.create);  
    
    // Retrieve a single profile with id
    router.get("/:id", auth, petTypeMapping.findOne);  
    
    // Update a profile with id
    router.put("/:id", petTypeMapping.update);  
    
    // Delete a profile with id
    router.delete("/:id", petTypeMapping.delete);  
    
    app.use('/api/petTypeMapping', router);
  };
  