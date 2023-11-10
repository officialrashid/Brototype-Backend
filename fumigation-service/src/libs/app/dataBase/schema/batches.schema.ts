import mongoose from "mongoose";

const batchesSchema = new mongoose.Schema({
  batchName: String,
  hubLocation: String,
  fumigationStudents: [{
    studentId: String,
    name: String,
    email: String,
    phone:  Number,
    qualification: String,
    prefferredLocation: String,
    mock:[
      { examType:String,
        mark : Number,
        invigilatorId: String
    },
    { examType:String,
      mark: Number,
      invigilatorId: String
    },
    {   examType:String,
        mark :Number,
        invigilatorId : String
    },
  {      examType:String,
        mark : Number,
        invigilatorId: String
    }
    ],
    final:[
      {
      examType:String,
        mark : Number,
        invigilatorId: String
    },
    {
      examType:String,
      mark: Number,
      invigilatorId: String
    },
     {
       examType:String,
        mark :Number,
        invigilatorId : String
    },
    {
        examType:String,
        mark : Number,
        invigilatorId: String
    }
    ]
    
  }]
});

const Batches = mongoose.model("Batches", batchesSchema);

export {
  Batches,
};
