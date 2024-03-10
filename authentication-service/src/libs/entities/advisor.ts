// entities/enquiries.ts

export class Advisors {
    firstName: String;
    lastName: String;
    email: String
    phone: Number;
    uniqueId : String;
  
    constructor(data: AdvisorsData) {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.email = data.email;
      this.phone = data.phone;
      this.uniqueId = data.uniqueId;
  
  
    }
  }
  
  interface AdvisorsData {
    firstName: String;
    lastName : String;
    email: String;
    phone: Number;
    uniqueId: String;
  }
  