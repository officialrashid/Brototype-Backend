import mongoose, { Schema, model } from "mongoose";
import { IReviewRecord } from "../interfaces/IReviewRecord";


const reviewRecordSchema=new Schema<IReviewRecord>(
    {
        recordId:mongoose.Schema.Types.ObjectId,
        weeklyReviews:[{
            _id:mongoose.Schema.Types.ObjectId,
            reviewStatus:{
                type:String,
                enum:['pending','completed'],
                default:'pending'
            },    
        }, {
            timeStamps:true
        }],
    },
    {
        timestamps:true
    }
)


const reviewRecord=model<IReviewRecord>('reviewRecord',reviewRecordSchema)

export {reviewRecord}