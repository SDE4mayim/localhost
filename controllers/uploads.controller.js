const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Storage engine for multer
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

// Initialize multer with the storage engine
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100000000000 // Set your file size limit here
    }
});

// Handle file upload
const handleFileUpload = (req, res) => {
    try {
        // Handle successful file upload and respond with a JSON object
        res.json({
            success: 1,
            profile_url: `https://vetcastle.com/api/image/${req.file.filename}`
        });
    } catch (error) {
        // Handle errors
        res.json({
            success: 0,
            message: error.message
        });
    }
};

// Get uploaded image
const getImage = (req, res) => {
    try {
        const filename = req.params.filename;
        const imagePath = path.join(__dirname, '../upload/images', filename);

        // Check if the file exists
        if (fs.existsSync(imagePath)) {
            // Send the file as a response
            res.sendFile(imagePath);
        } else {
            res.status(404).json({
                success: 0,
                message: "Image not found",
            });
        }
    } catch (error) {
        // Handle errors
        res.status(500).json({
            success: 0,
            message: error.message,
        });
    }
};

module.exports = { upload, handleFileUpload, getImage };
