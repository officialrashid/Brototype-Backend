// entities/enquiries.ts

export class Reviewers {
  firstName: String;
  lastName: String;
  email: String
  phone: Number;
  uniqueId : String;

  constructor(data: ReviewersData) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = data.phone;
    this.uniqueId = data.uniqueId;


  }
}

interface ReviewersData {
  firstName: String;
  lastName : String;
  email: String;
  phone: Number;
  uniqueId: String;
}
