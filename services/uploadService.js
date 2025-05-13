const LocationVO = require('../models/LocationVO');

exports.processUpload = ({ year, month, file }) => {
  const location = `${year}-${month}`;
  const nameAndTypeMap = new Map(); // CSV 파싱은 추후

  const locationVO = new LocationVO(nameAndTypeMap, location);

  console.log('📦 LocationVO 객체:', locationVO);
  console.log('📁 파일 경로:', file.path);
};
