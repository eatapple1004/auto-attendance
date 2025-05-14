const fs = require('fs');
const csv = require('csv-parser');
const LocationVO = require('../models/LocationVO');
const DayVO      = require('../models/DayVO');

exports.processUpload = ({ year, month, file }) => {
    const userInputYear = year;
    const userInputMonth = month;  
    
    parseCsvFile(file.path, year, month);

    //const location = "";
    //const nameAndTypeMap = new Map(); // CSV 파싱은 추후

    //const locationVO = new LocationVO(nameAndTypeMap, location);

    //console.log('📦 LocationVO 객체:', locationVO);
    //console.log('📁 파일 경로:', file.path);
};

function trimBeforeDateLine(text) {
    const lines = text.split('\n');
    const dateRegex = /^\s*\d{4}\.\d{2}\.\d{2}.*$/;
  
    const dateLineIndex = lines.findIndex(line => dateRegex.test(line));
    if (dateLineIndex === -1) return false;
  
    const remainingLines = lines.slice(dateLineIndex);
    return remainingLines.join('\n'); // ✅ 문자열로 합쳐서 반환
  }

function parseCsvFile(filePath, userYear, userMonth) {
    return new Promise((resolve, reject) => {
        const results = [];
        
        const dayLocationVOMap = new Map();

        fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            // row = { name: '홍길동', type: 'admin' } 등
            const columnA = Object.values(row)[0]; // 날짜
            const columnC = Object.values(row)[2]; // 출결 내용
            const valuableText = trimBeforeDateLine(columnC);

            // 데이터가 실제로 존재 하는지 체크
            if (!columnA || !columnC || !valuableText) return;

            const [year, month, day] = columnA.split(' ')[0].split('-');
            const time               = columnA.split(' ')[1];
            const location = valuableText.split('\n')[0].trim().split(' ')[2];

            // 유저가 원하는 유효한 데이터 인지 체크
            const userMonthInFormat = String(userMonth).padStart(2, '0'); // '05'
            //console.log(userYear + ", " + year);
            //console.log(userMonthInFormat + ", " + month);
            if(userYear != year || userMonthInFormat != month) return;
            console.log(valuableText);
            const lines = columnC.split('\n').slice(1).filter(Boolean);

            const nameAndTypeMap = new Map();

            lines.forEach(line => {
                const [name, ...statusParts] = line.split('/');
                const statusText = statusParts.join('/').trim();

                nameAndTypeMap.set(name, nameAndTypeMap);
            });
            
            const locationVO = new LocationVO(nameAndTypeMap, location, day, time);
            if (!dayLocationVOMap.has(day)) {
                dayLocationVOMap.set(day, []);
            }
            dayLocationVOMap.get(day).push(locationVO);
            
        })
        .on('end', () => {
            const newLocationVOjMap = new Map();

            const DayVOList = [];

            for (const [key, locationVOList] of dayLocationVOMap.entries()) {
                const locationMap = new Map();
                

                for (const obj of locationVOList) {
                    const loc = obj.getLocation();
                    const time = obj.getAbsolteTime();

                    if (!locationMap.has(loc)) {
                        locationMap.set(loc, obj); // 처음 나온 location
                    } else {
                        const existing = locationMap.get(loc);

                        // time 비교: 더 나중 시간만 남김
                        if (time > existing.getAbsolteTime()) {
                            locationMap.set(loc, obj);
                        }
                    }
                }

                // locationMap의 value들만 남김
                newLocationVOjMap.set(key, Array.from(locationMap.values()));
                const dayVO = new DayVO(Array.from(locationMap.values()), key);
                console.log(dayVO);
                DayVOList.push(dayVO)
            }
            console.log("--------------");
            console.log(DayVOList);

            resolve(DayVOList);
        })
        .on('error', (err) => {
            reject(err); // 오류 처리
        });
    });
}