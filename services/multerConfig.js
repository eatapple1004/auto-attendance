const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '_카카오톡 채팅 내역.csv';
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
module.exports = upload;
