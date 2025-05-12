const express = require('express');
const router = express.Router();
//const uploadController = require('../controllers/uploadController');
const multer = require('multer');
const path = require('path');


router.get('/', (req, res) => {
  res.render('uploadCSV');
});


module.exports = router;
