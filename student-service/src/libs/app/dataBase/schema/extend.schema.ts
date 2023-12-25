import mongoose from "mongoose";

const extendSchema= new mongoose.Schema({
    studentId: String,
    advisorId:String,
    fullName: String,
    batch: String,
    domain:String,
    currentWeek: String,
    extendDays : Number,
    extendReason : String,
    status:Boolean,
    createdAt: {
        type: Date,
        default: Date.now,
      },
})
const Extend = mongoose.model("extend",extendSchema)
console.log(Extend,"students schemaaaaa");
export{
    Extend,
}
