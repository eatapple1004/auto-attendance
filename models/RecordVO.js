class RecordVO {
    constructor(year, month, location, name) {
      this.year     = year;
      this.month    = month;
      this.location = location;
      this.name     = name;
  
      this.leave         = []; // 휴무
      this.vacation      = []; // 연가
      this.morningHalf   = []; // 오전 반가
      this.afternoonHalf = []; // 오후 반가
      this.sick          = []; // 병가
      this.etc           = []; // 기타
    }
  
    mergeDay(inputDay, inputStatus) {
      const day    = inputDay;
      const status = inputStatus;
  
      if (!status || status == "정상출근") return;
  
      const push = (arr, val) => {
        if (!arr.includes(val)) arr.push(val);
      };

      switch (status) {
        case '휴무':      push(this.leave,         day);       break;
        case '연가':      push(this.vacation,      day);       break;
        case '오전 반가':  push(this.morningHalf,   day);       break;
        case '오후 반가':  push(this.afternoonHalf, day);       break;
        case '오전반가':   push(this.morningHalf,   day);       break;
        case '오후반가':   push(this.afternoonHalf, day);       break;
        case '병가':      push(this.sick,          day);       break;
        default:         push(this.etc, `${status}(${day})`); break;
      }
    }
  
    toObject() {
      return {
        '년.월':    `${this.year}.${this.month}`,
        '역':       this.location,
        '이름':     this.name,
        '휴무':     this.leave.join(', '),
        '연가':     this.vacation.join(', '),
        '오전 반가': this.morningHalf.join(', '),
        '오후 반가': this.afternoonHalf.join(', '),
        '병가':     this.sick.join(', '),
        '기타':     this.etc.join(', ')
      };
    }
  }
  
  module.exports = RecordVO;
  