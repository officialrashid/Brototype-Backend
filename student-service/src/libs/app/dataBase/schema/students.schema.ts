import mongoose from "mongoose";

const studentSchema= new mongoose.Schema({
    name: String,
    email: String

})
const students = mongoose.model("students",studentSchema)
console.log(students,"students schemaaaaa");
export{
    students,
}
