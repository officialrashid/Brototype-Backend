import { reviewerRepository} from '../libs/app/repository/index'
import {scheduleTime_Usecase,getScheduleEvents_Usecase,updateScheduleEvents_Usecase,deleteScheduleEvents_Usecase,getDayTimeLineup_Usecase,getAllDetails_Usecase} from '../libs/usecase';

const useCase:any = {
   scheduleTime_Usecase,
   getScheduleEvents_Usecase,
   updateScheduleEvents_Usecase,
   deleteScheduleEvents_Usecase,
   getDayTimeLineup_Usecase,
   getAllDetails_Usecase
  
};
const repository:any={reviewerRepository}
export default {useCase,repository }