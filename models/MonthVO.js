class MonthVO {
    constructor(dayList = [], year = 0, month = 0) {
      this.dayList = dayList; // DayVO[]
      this.year = year;       // number
      this.month = month;     // number (1~12)
    }
    
    getDayList() {
      return this.dayList;
    }

    getYear() {
      return this.year;
    }

    getMonth() {
      return this.month;
    }

    // 선택: DayVO 추가
    addDayVO(dayVO) {
      this.dayList.push(dayVO);
    }
  
    // 선택: 연도/월 설정
    setDate(year, month) {
      this.year = year;
      this.month = month;
    }
}

module.exports = MonthVO;