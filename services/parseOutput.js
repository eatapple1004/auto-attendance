const RecordVO = require('../models/RecordVO');
const MonthVO  = require('../models/MonthVO');

exports.parseOutputData = (monthVO) => {

    const recordVOList = makeRecordVOList(monthVO);
}

function makeRecordVOList(monthVO) {

    const recordVOList = [];

    for(const dayVO of monthVO.getDayList()) {
        const year = monthVO.year;
        const month = monthVO.monthl

        for(const locationVO of dayVO.getLocation()) {

            const location = locationVO.getLocation();
            const nameAndTypeMap = locationVO.getNameAndTypeMap();
            
            for (const [key, value] of nameAndTypeMap) {
                //console.log(`key: ${key}, value: ${value}`);
                const name = key;

                const isChanged = false;

                for(const recordVO of recordVOList) { // 이미 존재 하는지 체크
                    if(recordVO.name == name && recordVO.location == location) {
                        // 새로운 day 정보 추가 



                        isChanged = true;
                        break;
                    }
                    else {
                        // 다음 데이터 체크

                        continue
                    }
                }

                if(!isChanged) { // 변경 되지 않았다면, 새로운 recordVO를 만들어 더해야함

                }

            }

        }

    }
}

