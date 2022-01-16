const express = require('express');
const router = express.Router();
const ImageController = require('./ImageController')

router.post("/upload", ImageController.uploadImage)

module.exports = router;