import mongoose from "mongoose";

const invigilatorSchema= new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    batch : String,
    uniqueId : String,
    createdAt: {
        type: Date,
        default: Date.now,
      },

})
const Invigilators = mongoose.model("Invigilators",invigilatorSchema)

export{
    Invigilators,
}
