// entities/enquiries.ts

export class addressDetails {
    
    houseName: string;
    village: string;
    taluk: string;
    district: string;
    state: string;
    pincode: string;
    
      constructor(houseName:string,village:string,taluk:string,district:string,state:string,pincode:string,) {
        this.houseName = houseName;
        this.village =village;
        this.taluk =taluk;
        this.district =district;
        this.state =state;
        this.pincode =pincode;
      }
    }
    
    interface AddressData {
      houseName: String;
      village: String;
      taluk: String;
      district: String;
      state:Number;
      pincode:String;

    }
    