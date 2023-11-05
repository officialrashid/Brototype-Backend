import mongoose from "mongoose";

const invigilatorSchema= new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    batch : String,
    uniqueId : String,

})
const Invigilators = mongoose.model("Invigilators",invigilatorSchema)

export{
    Invigilators,
}
