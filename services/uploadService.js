const LocationVO = require('../models/LocationVO');

exports.processUpload = ({ year, month, file }) => {
    const userInputYear = year;
    const userInputMonth = month;  
    


    const location = "";
    const nameAndTypeMap = new Map(); // CSV 파싱은 추후

    const locationVO = new LocationVO(nameAndTypeMap, location);

    console.log('📦 LocationVO 객체:', locationVO);
    console.log('📁 파일 경로:', file.path);
};

function trimBeforeDateLine(text) {
    const lines = text.split('\n');
    const dateRegex = /^\s*\d{4}\.\d{2}\.\d{2}.*$/;
  
    const dateLineIndex = lines.findIndex(line => dateRegex.test(line));
  
    if (dateLineIndex === -1) return []; // 날짜 줄이 없으면 빈 배열 반환
  
    return lines.slice(dateLineIndex); // 날짜 줄부터 끝까지 반환
}

function parseCsvFile(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            // row = { name: '홍길동', type: 'admin' } 등
            const columnA = Object.values(row)[0]; // 날짜
            const columnC = Object.values(row)[2]; // 출결 내용

            if (!columnA || !columnC || !trimBeforeDateLine(columnC)) return;

            results.push(row);
        })
        .on('end', () => {
            resolve(results); // 파싱 완료 후 결과 반환
        })
        .on('error', (err) => {
            reject(err); // 오류 처리
        });
    });
}