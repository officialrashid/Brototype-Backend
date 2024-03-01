import mongoose, { Types } from "mongoose";

const studentsSchema = new mongoose.Schema({
    studentId:String,
    batchId : String,
    name: String,
    email: String,
    phone: String,
    batch: String,
    uniqueId: String,
    isStatus: String
});

const Students = mongoose.model("Students", studentsSchema);

export {
    Students,
};
