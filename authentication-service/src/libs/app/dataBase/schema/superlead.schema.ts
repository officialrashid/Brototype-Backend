import mongoose, { Types } from "mongoose";

const superleadSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    uniqueId: String,
});

const Superleads = mongoose.model("Superleads", superleadSchema);

export {
    Superleads,
};
