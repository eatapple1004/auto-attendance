const express = require('express');
const router = express.Router();
const upload = require('../services/multerConfig');
const uploadController = require('../controllers/uploadController');

router.get('/', uploadController.renderUploadPage);
router.post('/', upload.single('csvFile'), uploadController.handleUpload);

module.exports = router;
