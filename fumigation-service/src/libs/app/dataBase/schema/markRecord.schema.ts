import mongoose from "mongoose";

const markRecordSchema= new mongoose.Schema({
    batchId: String,
    
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
