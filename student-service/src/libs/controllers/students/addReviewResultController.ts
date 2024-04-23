
import { Request,Response } from "express";


export default (dependencies:any)=>{
    const {
        useCase: { addReviewResult_Usecase }
    } = dependencies
 const addReviewResultController = async (req:Request,res:Response)=>{
    const { batchId,studentId,week,repeat,reviewScore,communicationScore,personalWorkoutsScore,miscellaneousWorkouts,totalScore,status,advisorId,reviewerId,date,pendingTopics,nextWeekUpdation,personalWorkoutReview,MiscellaneousWorkoutsReview,CommunicationReview,totalWeeks  } = req.body
    const response = await addReviewResult_Usecase(dependencies).executeFunction(batchId,studentId,week,repeat,reviewScore,communicationScore,personalWorkoutsScore,miscellaneousWorkouts,totalScore,status,advisorId,reviewerId,date,pendingTopics,nextWeekUpdation,personalWorkoutReview,MiscellaneousWorkoutsReview,CommunicationReview,totalWeeks)
     if(response){
        res.status(201).json(response)
     }  
 }
 return addReviewResultController;
}
