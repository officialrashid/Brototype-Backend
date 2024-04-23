
  
export const addReviewResult_Usecase = (dependencies: any) => {

  const {
      repository: { studentsRepository },
  } = dependencies;

  if (!studentsRepository) {
      return console.log("Error: student Repository not found");
  }

  const executeFunction = async (batchId: string,studentId: string,week: string,repeat: boolean,reviewScore: number,communicationScore: number,personalWorkoutsScore: number,miscellaneousWorkouts: number,totalScore: number,status: boolean,advisorId: string,reviewerId: string,date: string,pendingTopics: any,nextWeekUpdation: any,personalWorkoutReview: any,MiscellaneousWorkoutsReview: any,CommunicationReview: any,totalWeeks:number) => {
      try {
          
          const response = await studentsRepository.addReviewResult(batchId,studentId,week,repeat,reviewScore,communicationScore,personalWorkoutsScore,miscellaneousWorkouts,totalScore,status,advisorId,reviewerId,date,pendingTopics,nextWeekUpdation,personalWorkoutReview,MiscellaneousWorkoutsReview,CommunicationReview,totalWeeks)
     
          
          if(response && response.length !=0){
              console.log("usecaseil kerrrriiiiii");
              
              return {status:true,response}
          }else{
              return {status:false,message:"student not found Your Hub"}
          }
      } catch (err) {
          return { status: false, message: "The Some issue in the get Course completion graph" }
      }

  }
  return {
      executeFunction,
  };
};
