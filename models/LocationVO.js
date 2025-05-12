class LocationVO {
    constructor(nameAndTypeMap = new Map(), location = '') {
      this.nameAndTypeMap = nameAndTypeMap; // Map<string, string>
      this.location = location;             // string 또는 객체
    }
  
    // 선택: name/type 추가 헬퍼 메서드
    addNameType(name, type) {
      this.nameAndTypeMap.set(name, type);
    }
  
    // 선택: 전체 name 리스트 반환
    getNames() {
      return Array.from(this.nameAndTypeMap.keys());
    }
  
    // 선택: 특정 name의 type 반환
    getTypeByName(name) {
      return this.nameAndTypeMap.get(name);
    }
}
  