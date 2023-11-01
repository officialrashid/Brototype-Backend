import mongoose from "mongoose";

const batchesSchema= new mongoose.Schema({
    batchName: String,
    hubLocation : String,
    fumigationStudents: [{
        userId: String,
        Pattern: Number,
        Array: Number,
        Oops: Number,
        Communication: Number
    }]

})
const Batches = mongoose.model("Batches",batchesSchema)

export{
    Batches,
}
