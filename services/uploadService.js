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

function parseCsvFile(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            // row = { name: '홍길동', type: 'admin' } 등
            const columnA = Object.values(row)[0]; // 날짜
            const columnC = Object.values(row)[2]; // 출결 내용

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