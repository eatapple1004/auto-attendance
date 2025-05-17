const uploadService       = require('../services/uploadService');
const makeOutput          = require('../services/makeOutput');
const parseOutput         = require('../services/parseOutput');
const exportParsedService = require('../services/exportParsedService')

exports.renderUploadPage = (req, res) => {
  res.render('uploadCSV');
};

exports.handleUpload = async (req, res) => {
  const { year, month } = req.body;
  const file = req.file;

  if (!year || !month || !file) {
    return res.status(400).send('❌ year, month, file은 필수입니다.');
  }

  // 1. input데이터 파싱 작업
  const monthVO = await uploadService.processUpload({ year, month, file });
  
  // 2. output 데이터 파싱 작업
  const recordVOList = makeOutput.makeOutputData(monthVO);
  
  // 3. 월요일 정기 휴무, 교육 체크, 변수 설정들
  const parsedRecordVOList = parseOutput.parseOutputData(recordVOList, year, month);

  // 4. recordVO to excel file
  exportParsedService.exportParsed(parsedRecordVOList);

  res.send('✅ 업로드 완료. 콘솔을 확인하세요.');
};
