const auth = require("../middleware/auth");

module.exports = app => {  
    const hospitalCategory = require("../controllers/hospital_category.controller.js");
    
    var router = require("express").Router();  
    
    // Create a new profile
    router.post("/", hospitalCategory.create);  
    
    // Retrieve a single profile with id
    router.get("/:id", auth, hospitalCategory.findOne);  
    router.get("/", hospitalCategory.findAll);  
    
    // Update a profile with id
    router.put("/:id", hospitalCategory.update);  
    
    // Delete a profile with id
    router.delete("/:id", hospitalCategory.delete);  
    
    app.use('/api/hospitalCategory', router);
  };
  