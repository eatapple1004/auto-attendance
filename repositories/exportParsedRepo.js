const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const RecordVO = require('../models/RecordVO');

exports.exportParsed = async (recordVOList) => {
  const data = [];

  for (const recordVO of recordVOList) {
    data.push(recordVO.toObject());
  }

  // ✅ 1. 파일 이름 생성
  const today    = new Date();
  const yyyy     = today.getFullYear();
  const mm       = String(today.getMonth() + 1).padStart(2, '0');
  const dd       = String(today.getDate()).padStart(2, '0');
  const fileName = `Kakao_Attendance_${yyyy}-${mm}-${dd}.xlsx`;

  // ✅ 2. 저장 경로 설정
  const outputPath = path.join(__dirname, '../data', fileName);

  // ✅ 3. 워크북/시트 생성
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook  = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // ✅ 4. 저장
  XLSX.writeFile(workbook, outputPath);
};
