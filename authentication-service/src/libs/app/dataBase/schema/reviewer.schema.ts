import mongoose, { Types } from "mongoose";

const reviewerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    uniqueId: String,
});

const Reviewers = mongoose.model("Reviewers", reviewerSchema);

export {
    Reviewers,
};
