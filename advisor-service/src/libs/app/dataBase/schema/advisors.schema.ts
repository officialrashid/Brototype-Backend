import mongoose from "mongoose";

const advisorSchema= new mongoose.Schema({
    name: String,
    email: String

})
const advisors = mongoose.model("advisors",advisorSchema)
console.log(advisors,"students schemaaaaa");
export{
    advisors,
}
