module.exports = app => {
    const salesbill = require("../controllers/salesbill.controller.js");
  
    var router = require("express").Router();
  
    // Create a new SalesBill
    router.post("/", salesbill.create);
  
    // Retrieve all SalesBills
    router.get("/", salesbill.findAll);
  
    // Retrieve a single SalesBill with id
    router.get("/:id", salesbill.findOne);
  
    // Update a SalesBill with id
    router.put("/:id", salesbill.update);
  
    // Delete a SalesBill with id
    router.delete("/:id", salesbill.delete);
  
    // Delete all SalesBills
    router.delete("/", salesbill.deleteAll);
  
    app.use('/api/salesbills', router);
  };
  