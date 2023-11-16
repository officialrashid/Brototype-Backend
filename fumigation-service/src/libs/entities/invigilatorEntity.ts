// entities/enquiries.ts

export class Invigilators {
    
    name: String;
    email: String;
    phone: Number;
    batch: String;
    uniqueId : String;
  
    constructor(data: InvigilatorsData) {
      this.name = data.name;
      this.email = data.email;
      this.phone = data.phone;
      this.batch = data.batch;
      this.uniqueId = data.uniqueId;
  

    }
  }
  
  interface InvigilatorsData {
    name: String;
    email: String;
    phone: Number;
    batch: String;
    uniqueId: String;



  }
  