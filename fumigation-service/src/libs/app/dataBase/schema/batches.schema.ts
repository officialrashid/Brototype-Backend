import mongoose from "mongoose";
const { Schema, Types } = mongoose;
const batchesSchema = new mongoose.Schema({
  batchName: String,
  hubLocation: String,
  fumigationStudents: [{
    studentId: {
      type: Types.ObjectId,  // Use ObjectId type for reference
      ref: 'Enqueries',  // Reference to the 'Student' model
    },
    name: String,
    email: String,
    phone:  Number,
    qualification: String,
    prefferredLocation: String,
    isStatus:{
      type:String,
      default:"Active"
    },
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
  IsCompleted: {
    type: Boolean,
    default: false,
  },
});

const Batches = mongoose.model("Batches", batchesSchema);

export {
  Batches,
};
