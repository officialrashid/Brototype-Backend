
import { Request,Response } from "express";


export default (dependencies:any)=>{
    const {
        useCase: { addReviewResult_Usecase }
    } = dependencies
 const addReviewResultController = async (req:Request,res:Response)=>{
    console.log(req.body,"this is review result updationsssss");
    
    const { batchId,studentId,currentWeek,repeat,reviewScore,communicationScore,personalScore,miscellaneousScore,totalScore,status,advisorName,reviewerName,date,pendingTopics,nextweekUpdation,personalReview,miscellaneousReview,communicationReview,totalWeeks,reviewerId,eventId,slotId,reviewId,coordinatorId} = req.body

    
    const response = await addReviewResult_Usecase(dependencies).executeFunction(batchId,studentId,currentWeek,repeat,reviewScore,communicationScore,personalScore,miscellaneousScore,totalScore,status,advisorName,reviewerName,date,pendingTopics,nextweekUpdation,personalReview,miscellaneousReview,communicationReview,totalWeeks,reviewerId,eventId,slotId,reviewId,coordinatorId)
     if(response){
        res.status(201).json(response)
     }  
 }
 return addReviewResultController;
}
