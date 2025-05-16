const uploadService = require('../services/uploadService');

exports.renderUploadPage = (req, res) => {
  res.render('uploadCSV');
};

exports.handleUpload = async (req, res) => {
  const { year, month } = req.body;
  const file = req.file;

  if (!year || !month || !file) {
    return res.status(400).send('❌ year, month, file은 필수입니다.');
  }

  //console.log("year :: " + year + ", month :: " + month + ", file ::" + file.originalname);

  // 1. input데이터 파싱 작업
  const monthVO = await uploadService.processUpload({ year, month, file });
  
  // 2. output 데이터 파싱 작업

  res.send('✅ 업로드 완료. 콘솔을 확인하세요.');
};
