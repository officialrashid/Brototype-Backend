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
        invigilatorId: String,
        startTime:String,
        endTime: String
    },
    { examType:String,
      mark: Number,
      invigilatorId: String,
      startTime:String,
      endTime: String
    },
    {   examType:String,
        mark :Number,
        invigilatorId : String,
        startTime:String,
        endTime: String
    },
  {      examType:String,
        mark : Number,
        invigilatorId: String,
        startTime:String,
        endTime: String
    }
    ],
    final:[
      {
      examType:String,
        mark : Number,
        invigilatorId: String,
        startTime:String,
        endTime: String
    },
    {
      examType:String,
      mark: Number,
      invigilatorId: String,
      startTime:String,
      endTime: String
    },
     {
       examType:String,
        mark :Number,
        invigilatorId : String,
        startTime:String,
        endTime: String
    },
    {
        examType:String,
        mark : Number,
        invigilatorId: String,
        startTime:String,
        endTime: String
    }
    ]
    
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Batches = mongoose.model("Batches", batchesSchema);

export {
  Batches,
};
