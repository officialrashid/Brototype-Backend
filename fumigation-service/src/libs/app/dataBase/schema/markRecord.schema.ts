import mongoose, { Types } from "mongoose";

const markRecordSchema= new mongoose.Schema({
    batchId: {
        type: Types.ObjectId,  // Use ObjectId type for reference
        ref: 'Batches',  // Reference to the 'Student' model
      },
    
        mock:[{
            passed:[

            ],
            failed:[

            ]
        }],
        final:[{
            passed:[

            ],
            failed:[

            ]
        }] ,
           
        createdAt: {
            type: Date,
            default: Date.now,
          },
})
const markRecords = mongoose.model("markRecord",markRecordSchema)

export{
    markRecords,
}
