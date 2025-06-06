const RecordVO = require('../models/RecordVO');

exports.parseOutputData = (recordVOList, year, month) => {

    const mondayCheckedRecordVOList = checkMonday(recordVOList, year, month);
    const halfCheckedRecordVOList   = checkHalf(mondayCheckedRecordVOList);
    return halfCheckedRecordVOList;
}

function checkMonday(recordVOList, year, month) {
    
    const mondayList = getMondaysInMonth(year, month);

    for(const recordVO of recordVOList) {
        
        // 월요일 휴무 입력
        for(const monday of mondayList) {
            recordVO.leave.push(monday);
        }
        

        // 숫자 순서 맞추기
        recordVO.leave.sort();
        
        // 교육 체크 및 월요일 휴뮤 제외 처리
        for(const etcText of recordVO.etc) {
            if (etcText.includes('교육')) {
                const day      = etcText.match(/\((\d{2})\)/);
                const fullDate = `${year}-${month}-${day}`;
                const monday   = getMondayDayOnly(fullDate);

                const index = recordVO.leave.indexOf(monday);
                if (index !== -1) {
                    recordVO.leave.splice(index, 1);
                }
                break;
            }    
        }
    }

    return recordVOList;

}


function getMondayDayOnly(dateStr) {
    const date = new Date(dateStr); // 예: '2025-05-14'
    const day = date.getDay();      // 요일: 0(일) ~ 6(토)
  
    const diff = day === 0 ? -6 : 1 - day; // 일요일이면 -6, 그 외엔 1 - day
    date.setDate(date.getDate() + diff);
  
    // 날짜 일자만 두 자리 문자열로 반환 ('01' ~ '31')
    return String(date.getDate()).padStart(2, '0');
}

function getMondaysInMonth(year, month) {
    const mondays = [];
    const today = new Date();
    const targetMonth = month - 1; // JS는 0부터 시작 (5월 → 4)
  
    const date = new Date(year, targetMonth, 1);
  
    while (date.getMonth() === targetMonth) {
      if (date.getDay() === 1 && date <= today) {
        // 월요일이면서 오늘 이전
        mondays.push(date.getDate().toString().padStart(2, '0'));
      }
  
      date.setDate(date.getDate() + 1); // 하루씩 증가
    }

    return mondays;
}

// 반차 type 2차 확인 - 오전, 오후
function checkHalf(recordVOList) {

    for(const recordVO of recordVOList) {

        let isChanged = false;

        const newEtcList = [];

        for(const etcText of recordVO.etc) {
            if(etcText.includes('반차')) {
                // 마지막 괄호의 2자리 숫자만 추출
                const day = etcText.match(/\((\d{2})\)[^\(]*$/)?.[1]; 
                
                if(etcText.includes('오전')) {
                    // 마지막 괄호의 2자리 숫자만 추출
                    recordVO.morningHalf.push(day);
                    isChanged = true;
                    continue;
                }
                else if(etcText.includes('오후')) {
                    recordVO.afternoonHalf.push(day);
                    isChanged = true;
                    continue;
                }
            }
            newEtcList.push(etcText);
        }

        recordVO.etc = newEtcList;

        if(isChanged) {
            recordVO.morningHalf.sort();
            recordVO.afternoonHalf.sort();
        }
    }

    return recordVOList;
}