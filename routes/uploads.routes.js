const auth = require("../middleware/auth");


module.exports = app => {  
    const uploads = require("../controllers/uploads.controller.js");
    
    var router = require("express").Router();  
    
    // upload an image
    router.post("/upload", uploads.upload.single('profile'), uploads.handleFileUpload);

    router.get("/image/:filename", uploads.getImage);
    
    app.use('/api', router);
  };
  