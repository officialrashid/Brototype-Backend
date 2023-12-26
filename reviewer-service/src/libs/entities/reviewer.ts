// entities/enquiries.ts

export class Students {
  studentId : string;
  name: String;
  email: String;
  phone: Number;
  batch: String;
  uniqueId : String;

  constructor(data: StudentsData) {
    console.log(data,"data coming to entitites");
    
    this.studentId = data.studentId;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.batch = data.batch;
    this.uniqueId = data.uniqueId;


  }
}

interface StudentsData {
  studentId : string
  name: String;
  email: String;
  phone: Number;
  batch: String;
  uniqueId: String;



}
