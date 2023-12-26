
export class Extend {
    studentId: String;
    advisorId:String;
    fullName: String;
    batch: String;
    domain:String;
    currentWeek: String;
    extendDays : Number;
    extendReason : String;
    status:Boolean;

  
    constructor(data: ExtendData,status:Boolean) {
      this.studentId = data.studentId;
      this.advisorId = data.advisorId;
      this.fullName = data.fullName;
      this.batch = data.batch;
      this.domain = data.domain;
      this.currentWeek = data.currentWeek;
      this.extendDays = data.extendDays;
      this.extendReason = data.extendReason;
      this.status = status;


    }
  }
  
  interface ExtendData {
    studentId: String;
    advisorId: String;
    fullName : String;
    batch : String;
    domain : String;
    currentWeek : String;
    extendDays : Number;
    extendReason: String;
    status : Boolean;
 
  
  }