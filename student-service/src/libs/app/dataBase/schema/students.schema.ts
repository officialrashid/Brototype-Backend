import mongoose, { Schema, Types } from 'mongoose';

const manifestSchema = new mongoose.Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  firstName: String,
  lastName: String,
  domain: String,
  batch: String,
  middleName: String,
  dateOfBirth: String,
  age: Number,
  email: String,
  gender: String,
  phone: Number,
  fathersName: String,
  fathersContact: Number,
  mothersName: String,
  mothersContact: Number,
  houseName: String,
  village: String,
  taluk: String,
  district: String,
  state: String,
  pincode: Number,
  highestQualification:String,
  yearOfPassing:String,
  passPercentage:String,
  schoolOrCollegeOrInstituteName:String,
  imageUrl: String,
  governmentIdImageUrl: String,

});

const Manifest = mongoose.model('Manifest', manifestSchema);

export { Manifest };
