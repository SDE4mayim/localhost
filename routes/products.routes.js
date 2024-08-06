module.exports = app => {
    const products = require("../controllers/products.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Product
    router.post("/", products.create);
  
    // Retrieve all Products
    router.get("/", products.findAll);
  
    // Retrieve a single Product with id
    router.get("/:id", products.findOne);
  
    // Update a Product with id
    router.put("/:id", products.update);
  
    // Delete a Product with id
    router.delete("/:id", products.delete);
  
    // Enable a Product with id
    router.put("/enable/:id", products.enable);
  
    // Disable a Product with id
    router.put("/disable/:id", products.disable);
  
    app.use('/api/products', router);
  };
  