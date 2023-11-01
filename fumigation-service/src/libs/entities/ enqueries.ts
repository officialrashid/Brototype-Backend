// entities/enquiries.ts

export class Enquiry {
    
    name: string;
    email: string;
    phone: string;
    qualification: string;
    preferredLocation: string;
  
    constructor(data: EnquiryData) {
      this.name = data.name;
      this.email = data.email;
      this.phone = data.phone;
      this.qualification = data.qualification;
      this.preferredLocation = data.preferredLocation;
    }
  }
  
  interface EnquiryData {
    name: string;
    email: string;
    phone: string;
    qualification: string;
    preferredLocation: string;
  }
  