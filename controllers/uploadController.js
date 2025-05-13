const uploadService = require('../services/uploadService');

exports.renderUploadPage = (req, res) => {
  res.render('uploadCSV');
};

exports.handleUpload = (req, res) => {
  const { year, month } = req.body;
  const file = req.file;

  if (!year || !month || !file) {
    return res.status(400).send('❌ year, month, file은 필수입니다.');
  }

  //console.log("year :: " + year + ", month :: " + month + ", file ::" + file.originalname);

  // 서비스 계층으로 위임
  uploadService.processUpload({ year, month, file });

  res.send('✅ 업로드 완료. 콘솔을 확인하세요.');
};
