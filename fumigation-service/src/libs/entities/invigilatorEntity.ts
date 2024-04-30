// entities/enquiries.ts

export class Invigilators {
    
    name: String;
    email: String;
    contact: Number;
    batch: String;
    uniqueId : String;
  
    constructor(data: InvigilatorsData) {
      this.name = data.name;
      this.email = data.email;
      this.contact = data.contact;
      this.batch = data.batch;
      this.uniqueId = data.uniqueId;
  

    }
  }
  
  interface InvigilatorsData {
    name: String;
    email: String;
    contact: Number;
    batch: String;
    uniqueId: String;



  }
  