import mongoose from "mongoose";

export interface IReviewRecord{
    recordId:mongoose.Schema.Types.ObjectId
    weeklyReviews:Array<any>,
    pendingReviews:Array<{studentId:string,
        _id:mongoose.Types.ObjectId,name:string,lastWeek:Boolean,currentWeek:string}>    

}