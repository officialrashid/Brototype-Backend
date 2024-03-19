import { superleadRepository} from '../libs/app/repository/index'
import {profileUpdate_Usecase,getProfile_Usecase,patchProfile_Usecase,getChatAllSuperleads_Usecase,updateActivityEvent_Usecase,getActivityEvents_Usecase,getActivityTimeLineup_Usecase,editActivityEvent_Usecase,deleteActivityEvent_Usecase} from '../libs/usecase';

const useCase:any = {
   profileUpdate_Usecase,
   getProfile_Usecase,
   patchProfile_Usecase,
   getChatAllSuperleads_Usecase,
   updateActivityEvent_Usecase,
   getActivityEvents_Usecase,
   getActivityTimeLineup_Usecase,
   editActivityEvent_Usecase,
   deleteActivityEvent_Usecase
};
const repository:any={superleadRepository}
export default {useCase,repository }