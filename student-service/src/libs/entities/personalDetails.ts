// entities/enquiries.ts

export class personalDetails {
    
  firstName: String;
    lastName: String;
    middleName: String;
    dateOfBirth: String;
    age:String;
    gender:String;
    email:String;
    phone:string;
    fathersName:String;
    mothersName:String;
    fathersContact:string;
    mothersContact:string;
  
    constructor(firstName:string,lastName:string,middleName:string,dateOfBirth:string,age:string,email:string,
      phone:string,gender:string,fathersName:string,mothersName:string,fathersContact:string,mothersContact:string) {
      this.firstName = firstName;
      this.lastName =lastName;
      this.middleName =middleName;
      this.dateOfBirth =dateOfBirth;
      this.age =age;
      this.gender =gender;
      this.email =email;
      this.phone =phone;
      this.fathersName =fathersName;
      this.mothersName =mothersName;
      this.fathersContact =fathersContact;
      this.mothersContact =mothersContact;
  

    }
  }
  
  interface personalDeta {
    firstName: String;
    lastName: String;
    middleName: String;
    dateOfBirth: String;
    age:Number;
    gender:String;
    email:String;
    phone:Number;
    fathersName:String;
    mothersName:String;
    fathersContact:Number;
    mothersContact:Number;
  }
  