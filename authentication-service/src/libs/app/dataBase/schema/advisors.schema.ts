import mongoose, { Types } from "mongoose";

const advisorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    uniqueId: String,
    isStatus:{
        type:String,
        default : 'Active'
    },
    createdDate: {
        type: Date,
        default: Date.now // Set default value to the current date
    },
    weeklyTask : {type:Number,default:0},
    weeklyTaskList: []
});
const Advisors = mongoose.model("Advisors", advisorSchema);

export {
    Advisors,
};
