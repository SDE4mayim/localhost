module.exports = app => {
    const salesbilldetails = require("../controllers/salesbilldetails.controller.js");
  
    var router = require("express").Router();
  
    // Create a new SalesBillDetails
    router.post("/", salesbilldetails.create);
  
    // Retrieve all SalesBillDetails
    router.get("/", salesbilldetails.findAll);
  
    // Retrieve a single SalesBillDetails with id
    router.get("/:id", salesbilldetails.findOne);
  
    // Update a SalesBillDetails with id
    router.put("/:id", salesbilldetails.update);
  
    // Delete a SalesBillDetails with id
    router.delete("/:id", salesbilldetails.delete);
  
    // Delete all SalesBillDetails
    router.delete("/", salesbilldetails.deleteAll);
  
    app.use('/api/salesbilldetails', router);
  };
  