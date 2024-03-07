import mongoose, { Types } from "mongoose";

const superleadSchema = new mongoose.Schema({
    superleadId:String,
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    gender: String,
    dateOfBirth: String,
    hubLocation: String,
    qualification: String,
    pastYourWorkedCompany:String,
    yearOfExpereience: Number,
    imageUrl: String,
});

const Superlead = mongoose.model("Superlead", superleadSchema);

export {
    Superlead,
};
