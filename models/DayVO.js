class DayVO {
    constructor(locationList = [], date = '') {
      this.locationList = locationList; // LocationVO[]
      this.date = date;                 // string day data
    }
  
    // 선택: LocationVO 하나 추가
    addLocationVO(locationVO) {
      this.locationList.push(locationVO);
    }
  
    // 선택: 날짜 문자열로 세팅
    setDate(dateStr) {
      this.date = dateStr;
    }
}
  
module.exports = DayVO;