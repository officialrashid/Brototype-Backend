
  
export const addReviewResult_Usecase = (dependencies: any) => {

  const {
      repository: { studentsRepository },
  } = dependencies;

  if (!studentsRepository) {
      return console.log("Error: student Repository not found");
  }

  const executeFunction = async (batchId: string,studentId: string,week: string,repeat: boolean,reviewScore: number,communicationScore: number,personalWorkoutsScore: number,miscellaneousWorkouts: number,totalScore: number,status: boolean,advisorName: string,reviewerName: string,date: string,pendingTopics: any,nextWeekUpdation: any,personalWorkoutReview: any,MiscellaneousWorkoutsReview: any,CommunicationReview: any,totalWeeks:number,reviewerId:string,eventId:string,slotId:string,reviewId:string,coordinatorId:string) => {
      try {
          
          const response = await studentsRepository.addReviewResult(batchId,studentId,week,repeat,reviewScore,communicationScore,personalWorkoutsScore,miscellaneousWorkouts,totalScore,status,advisorName,reviewerName,date,pendingTopics,nextWeekUpdation,personalWorkoutReview,MiscellaneousWorkoutsReview,CommunicationReview,totalWeeks,reviewerId,eventId,slotId,reviewId,coordinatorId)
     
          console.log(batchId,studentId,week,repeat,reviewScore,communicationScore,personalWorkoutsScore,miscellaneousWorkouts,totalScore,status,advisorName,reviewerName,date,pendingTopics,nextWeekUpdation,personalWorkoutReview,MiscellaneousWorkoutsReview,CommunicationReview,totalWeeks,reviewerId,eventId,slotId,"lllllll");
          
          if(response.status===true){
              console.log("usecaseil kerrrriiiiii");
              
              return {response}
          }else{
              return {status:false,message:"student result not updated"}
          }
      } catch (err) {
          return { status: false, message: "student result not updated,try after some time" }
      }

  }
  return {
      executeFunction,
  };
};
