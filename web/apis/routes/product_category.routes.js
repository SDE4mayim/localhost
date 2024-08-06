module.exports = app => {
    const product_categories = require("../controllers/product_category.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Category
    router.post("/", product_categories.create);
  
    // Retrieve all Categories
    router.get("/", product_categories.findAll);
  
    // Retrieve a single Category with id
    router.get("/:id", product_categories.findOne);
  
    // Update a Category with id
    router.put("/:id", product_categories.update);
  
    // Delete a Category with id
    router.delete("/:id", product_categories.delete);
  
    app.use('/api/product_categories', router);
  };
  