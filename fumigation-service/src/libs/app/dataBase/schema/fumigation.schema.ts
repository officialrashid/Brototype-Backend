import mongoose from "mongoose";

const fumigationSchema= new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    qualification : String,
    prefferredLocation : String

})
const Enqueries = mongoose.model("Enqueries",fumigationSchema)
console.log(Enqueries,"students schemaaaaa");
export{
    Enqueries,
}
