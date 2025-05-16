/*
const XLSX = require('xlsx');
const RecordVO = require('../models/RecordVO');

exports.exportParsed = async (recordVOList) => {
    const data = [];

    for (const recordVO of recordVOList) {
        data.push({
            time:           `${recordVO.year}.${recordVO.month}`,
            location:       recordVO.location,
            name:           recordVO.name,
            leave:          recordVO.leave.join(','),
            vacation:       recordVO.vacation.join(','),
            morningHalf:    recordVO.morningHalf.join(','),
            afternoonHalf:  recordVO.afternoonHalf.join(','),
            sick:           recordVO.sick.join(','),
            etc:            recordVO.etc.join(',')
        });
    }


    const wb = XLSX.readFile(outputPath);
    const sheet = wb.Sheets['Sheet1'];

    const startRow = 1;

    for (let i = 1; i < data.length; i++) {
        sheet[`A${startRow + i}`] = { v: data[i].time };
        sheet[`B${startRow + i}`] = { v: data[i].location };
        sheet[`C${startRow + i}`] = { v: data[i].name };
        sheet[`D${startRow + i}`] = { v: data[i].leave };
        sheet[`E${startRow + i}`] = { v: data[i].vacation };
        sheet[`F${startRow + i}`] = { v: data[i].morningHalf };
        sheet[`G${startRow + i}`] = { v: data[i].afternoonHalf };
        sheet[`H${startRow + i}`] = { v: data[i].sick };
        sheet[`I${startRow + i}`] = { v: data[i].etc };
    }

    // 추가된 범위를 반영하여 시트 범위 갱신
    const totalRows = startRow + data.length - 1; // 실제 데이터 끝나는 행 번호
    sheet['!ref'] = `A1:I${totalRows}`;

    XLSX.writeFile(wb, outputPath);
};
*/
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
