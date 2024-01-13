import mongoose, { Schema, Types } from 'mongoose';

const profileSchema = new mongoose.Schema({
  reviewerId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  age: Number,
  gender: String,
  experience: Number,
  skills: String,
  CurrentWorkingCompanyName: String,
  PrefferedDomainsForReview: String,
  imageUrl: String,
});

const Profile = mongoose.model('Profile', profileSchema);

export { Profile };
