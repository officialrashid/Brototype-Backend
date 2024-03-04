import { authenticationRepository} from '../libs/app/repository/index'
import {createInvigilator_Usecase,checkStudentUniqueId_Usecase,studentLogin_Usecase,reviewerLogin_Usecase,superleadLogin_Usecase,getAllStudentsStatus_Usecase,updateStudentStatus_Usecase,getHubwiseStudentsDetails_Usecase,getAllReviewersStatus_Usecase,addReviewer_Usecase,updateReviewerStatus_Usecase,getSuperleadHub_Usecase} from '../libs/usecase';

const useCase:any = {
   createInvigilator_Usecase,
   checkStudentUniqueId_Usecase,
   studentLogin_Usecase,
   reviewerLogin_Usecase,
   superleadLogin_Usecase,
   getAllStudentsStatus_Usecase,
   updateStudentStatus_Usecase,
   getHubwiseStudentsDetails_Usecase,
   getAllReviewersStatus_Usecase,
   addReviewer_Usecase,
   updateReviewerStatus_Usecase,
   getSuperleadHub_Usecase
};
const repository:any={authenticationRepository}
export default {useCase,repository }