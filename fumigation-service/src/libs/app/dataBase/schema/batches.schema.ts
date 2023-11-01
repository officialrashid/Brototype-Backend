import mongoose from "mongoose";

const batchesSchema= new mongoose.Schema({
    batchName: String,
    hubLocation : String,
    fumigationStudents: [{
        userId: String,
        pattern: String,
        array: String,
        oops: String,
        communication: String
    }]

})
const Batches = mongoose.model("Batches",batchesSchema)

export{
    Batches,
}
