import { reviewerRepository} from '../libs/app/repository/index'
import {scheduleTime_Usecase,getScheduleEvents_Usecase,updateScheduleEvents_Usecase,deleteScheduleEvents_Usecase,getDayTimeLineup_Usecase,getAllDetails_Usecase,profileUpdate_Usecase,reviewerWrokDetails_Usecase,getProfile_Usecase,reviewTakeCount_Usecase,getAllReviewersProfile_Usecase,getBestReviewers_Usecase,getReviewCountAnalyze_Usecase,getPerPageReviewers_Usecase,getAllChatReviewers_Usecase,getParticularEvents_Usecase,updateParticularEvents_Usecase,cancelParticularEvents_Usecase,getDomainWiseReviewers_Usecase,updateReviewCompleted_Usecase,getReviewes_Usecase} from '../libs/usecase';

const useCase:any = {
   scheduleTime_Usecase,
   getScheduleEvents_Usecase,
   updateScheduleEvents_Usecase,
   deleteScheduleEvents_Usecase,
   getDayTimeLineup_Usecase,
   getAllDetails_Usecase,
   profileUpdate_Usecase,
   reviewerWrokDetails_Usecase,
   getProfile_Usecase,
   reviewTakeCount_Usecase,
   getAllReviewersProfile_Usecase,
   getBestReviewers_Usecase,
   getReviewCountAnalyze_Usecase,
   getPerPageReviewers_Usecase,
   getAllChatReviewers_Usecase,
   getParticularEvents_Usecase,
   updateParticularEvents_Usecase,
   cancelParticularEvents_Usecase,
   getDomainWiseReviewers_Usecase,
   updateReviewCompleted_Usecase,
   getReviewes_Usecase
  
};
const repository:any={reviewerRepository}
export default {useCase,repository }