import mongoose,{Schema, model}  from "mongoose";
import { IReviews } from "../interfaces/IReviews";



const scheduledReviewSchema=new Schema<IReviews>(

        {
           weeklyReviews:Array
        },
        {
            timestamps:true
        }
)

const scheduledReviews=model<IReviews>('scheduledReview',scheduledReviewSchema)
export {scheduledReviews}