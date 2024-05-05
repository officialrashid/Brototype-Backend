import mongoose from "mongoose";
import moment from "moment";

const studentsSchema = new mongoose.Schema({
    studentId: String,
    batchId: String,
    name: String,
    email: String,
    phone: String,
    batch: String,
    uniqueId: String,
    isStatus: {
        type: String,
        default: 'Active'
    },
    createdDate: {
        type: String, // Change type to String
        default: moment().format('DD-MM-YYYY') // Format the date as required
    },
    placedDate: {
        type: String,
        default: ''
    },
    currentWeek: {type:Number,default:1},
    lastWeekReviewStatus: {type:Boolean,default:true},
    repeatCount : {type:Number,default:0},
    isRepeat : {type:Boolean, default:false},
    domain: {type:String , default:""},
    profileUrl: {type:String , default:""},

});
  

const Students = mongoose.model("Students", studentsSchema);

export {
    Students,
};
