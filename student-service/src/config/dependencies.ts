import { studentsRepository} from '../libs/app/repository/index'
import {profileUpdate_Usecase,getProfile_Usecase,personalDetails_Usecase,addressDetails_Usecase,educationDetails_Usecase,getBatchwiseBestStd_Usecase,getWeeklyPerformance_Usecase,getCourseCompletion_Usecase,getAllPerformance_Usecase,getExtendDetails_Usecase,requestExtention_Usecase,getExtendRequest_Usecase,getReviewDetails_Usecase } from '../libs/usecase';

const useCase:any = {
   profileUpdate_Usecase,
   getProfile_Usecase,
   personalDetails_Usecase,
   addressDetails_Usecase,
   educationDetails_Usecase,
   getBatchwiseBestStd_Usecase,
   getWeeklyPerformance_Usecase,
   getCourseCompletion_Usecase,
   getAllPerformance_Usecase,
   getExtendDetails_Usecase,
   requestExtention_Usecase,
   getExtendRequest_Usecase,
   getReviewDetails_Usecase
   
};
const repository:any={studentsRepository}
export default {useCase,repository }