export class Enquiry {
    
    name: string;
    email: string;
    phone: Number;
    qualification: string;
    prefferredLocation: string;
  
    constructor(data: EnquiryData) {
      this.name = data.name;
      this.email = data.email;
      this.phone = data.phone;
      this.qualification = data.qualification;
      this.prefferredLocation = data.prefferredLocation;
    }
  }
  
  interface EnquiryData {
    name: string;
    email: string;
    phone: Number;
    qualification: string;
    prefferredLocation: string;
  }