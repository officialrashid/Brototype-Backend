import mongoose, { Schema, model } from "mongoose";
import { ICoordinators } from "../interfaces/ICoordinators";

const coordinatorSchema= new Schema<ICoordinators>(
    {
        coordinatorsId:String,
        fullName:String,
        email:String,
        mobileNumber:String,
        totalReviewCount:{
            type:Number,
            default:0

        },
        profileImageUrl:String,
        sharedReviewCount:
        {
            type:Number,
            default:0
        },
        weeklyTaskCount:{
            type:Number,
            default:0
        },
        todaysTaskCount:{
            type:Number,
            default:0
        },
        events:[{
            _id:{
                type:mongoose.Schema.Types.ObjectId,
               auto:true
            },
            eventType:String,
            eventDescription:String,
            eventLocation:String,
            eventPlatform:String,
            startDate:String,
            endDate:String,
            startTime:String,
            endTime:String,
            conductedDate:Date         
        }]
    },
    {
        timestamps:true
    }
)


const coordinators= model<ICoordinators>('coordinator',coordinatorSchema)

export {coordinators}