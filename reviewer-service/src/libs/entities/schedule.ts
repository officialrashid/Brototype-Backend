// entities/enquiries.ts

export class Schedule {
  reviewerId : string;
  id : String;
  startTime: String;
  endTime : String;
  day : String;
  label : String;
  date : String;
  constructor(data: ScheduleData) {
    console.log(data,"data coming to entitites");
    
    this.reviewerId = data.reviewerId;
    this.id = data.id;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.day = data.day;
    this.label = data.label;
    this.date = data.date;
  }
}

interface ScheduleData {
  reviewerId : string
  id: String;
  startTime: String;
  endTime: String;
  day : String;
  label: String;
  date: String;
}
