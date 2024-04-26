import mongoose from "mongoose";


export interface IReviews{
    weeklyReviews:Array<{coordinatorsId:mongoose.Types.ObjectId,
               studentList:Array<{studentId:string,
             _id:mongoose.Types.ObjectId,name:string,lastWeek:Boolean,currentWeek:string}>}>
    
}