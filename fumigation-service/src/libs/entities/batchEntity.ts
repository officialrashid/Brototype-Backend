
export class Batches {
    
    batchName: String;
    hubLocation: String;

  
    constructor(data: EnquiryData) {
      this.batchName = data.batchName;
      this.hubLocation = data.hubLocation;

    }
  }
  
  interface EnquiryData {
    batchName: String;
    hubLocation: String;
 
  
  }