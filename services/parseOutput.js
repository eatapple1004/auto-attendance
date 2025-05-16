const RecordVO = require('../models/RecordVO');
const MonthVO  = require('../models/MonthVO');

exports.parseOutputData = (monthVO) => {

    const recordVOList = makeRecordVOList(monthVO);
    console.log(recordVOList);
}

function makeRecordVOList(monthVO) {

    const recordVOList = [];

    for(const dayVO of monthVO.getDayList()) {
        const year  = monthVO.year;
        const month = monthVO.monthl

        for(const locationVO of dayVO.getLocation()) {

            const day            = locationVO.date;
            const location       = locationVO.getLocation();
            const nameAndTypeMap = locationVO.getNameAndTypeMap();
            
            for (const [key, value] of nameAndTypeMap) {
                //console.log(`key: ${key}, value: ${value}`);
                const name      = key;
                const status    = value;
                const isChanged = false;

                for(const recordVO of recordVOList) { // 이미 존재 하는지 체크
                    if(recordVO.name == name && recordVO.location == location) {
                        // 새로운 day 정보 추가 
                        recordVO.mergeDay(day, status);
                        
                        isChanged = true;
                        break;
                    }
                    else {
                        // 다음 데이터 체크 + 알파
                        continue
                    }
                }

                if(!isChanged) { // 변경 되지 않았다면, 새로운 recordVO를 만들어 더해야함
                    const newRecordVO = new RecordVO(year, month, location, name);
                    newRecordVO.mergeDay(day, status);
                    recordVOList.push(newRecordVO);
                }

            }

        }

    }
}

