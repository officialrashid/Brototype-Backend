import { authenticationRepository} from '../libs/app/repository/index'
import {createInvigilator_Usecase,checkStudentUniqueId_Usecase,studentLogin_Usecase,reviewerLogin_Usecase,superleadLogin_Usecase,getAllStudentsStatus_Usecase,updateStudentStatus_Usecase,getHubwiseStudentsDetails_Usecase,getAllReviewersStatus_Usecase,addReviewer_Usecase,updateReviewerStatus_Usecase,getSuperleadHub_Usecase,updateStudentPlaced_Usecase,getStudentsAndPlacedStudents_Usecase,addAdvisor_Usecase,advisorLogin_Usecase,getStdDashboardDetails_Usecase,getAdvisorDetails_Usecase,getAllAdvisors_Usecase,updateAdvisorStatus_Usecase,getReviewInitiators_Usecase,updateReviewStatus_Usecase,updateManifestDetails_Usecase,getStudentProfile_Usecase,advisorGoogleLogin_Usecase} from '../libs/usecase';

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
   getSuperleadHub_Usecase,
   updateStudentPlaced_Usecase,
   getStudentsAndPlacedStudents_Usecase,
   addAdvisor_Usecase,
   advisorLogin_Usecase,
   getStdDashboardDetails_Usecase,
   getAdvisorDetails_Usecase,
   getAllAdvisors_Usecase,
   updateAdvisorStatus_Usecase,
   getReviewInitiators_Usecase,
   updateReviewStatus_Usecase,
   updateManifestDetails_Usecase,
   getStudentProfile_Usecase,
   advisorGoogleLogin_Usecase
};
const repository:any={authenticationRepository}
export default {useCase,repository }