const auth = require("../middleware/auth");

module.exports = app => {  
    const doctorManagement = require("../controllers/doctor_management.controller.js");
    
    var router = require("express").Router();  
    
    // Create a new profile
    router.post("/", doctorManagement.create);  
    
    // Retrieve a single profile with id
    router.get("/:id", auth, doctorManagement.findOne);
    router.get("/",  doctorManagement.findAll);    
    
    // Update a profile with id
    router.put("/:id", auth, doctorManagement.update);  
    
    // Delete a profile with id
    router.delete("/:id", auth, doctorManagement.delete);  

    // Enable a profile with id
    router.put("/enable/:id", auth, doctorManagement.enable);  
    
    // Disable a profile with id
    router.put("/disable/:id", auth, doctorManagement.disable); 
    
    app.use('/api/doctorManagement', router);
  };
  