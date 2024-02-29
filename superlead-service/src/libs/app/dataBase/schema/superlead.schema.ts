import mongoose, { Types } from "mongoose";

const superleadSchema = new mongoose.Schema({
    studentId:String,
    batchId : String,
    name: String,
    email: String,
    phone: String,
    batch: String,
    uniqueId: String,
});

const Superlead = mongoose.model("Superlead", superleadSchema);

export {
    Superlead,
};
