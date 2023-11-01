import mongoose from "mongoose";

const fumigationSchema= new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    qualification : String,
    prefferedLocation : String

})
const Enqueries = mongoose.model("Enqueries",fumigationSchema)
console.log(Enqueries,"students schemaaaaa");
export{
    Enqueries,
}
