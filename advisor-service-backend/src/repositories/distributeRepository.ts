import { reviewRecord } from "../entities/reviewRecord";
import { scheduledReviews } from "../entities/scheduledReview";
import { IDistributeRepository } from "../interfaces/IDistributeRepository";

export class DistributeRepository implements IDistributeRepository{

    async addReviewData(reviewData: any) {

        const response= await scheduledReviews.create({weeklyReviews:reviewData})
        if(response){
              const weeklyReviewsData=response.weeklyReviews
              if(weeklyReviewsData.length){
              
                for(let scheduledData of weeklyReviewsData){
                   let reviewRecordData= await reviewRecord.findById(scheduledData.coordinatorsId)
                   if(reviewRecordData){
                    reviewRecordData.weeklyReviews.push(scheduledData.studentList)
                    await reviewRecordData.save()
                   }else{
                    let  createReviewRecord=await reviewRecord.create({recordId:scheduledData.coordinatorsId,weeklyReviews:scheduledData.studentList})
                   }
                }
              }
        }

        //return response
        
    }

}