import { studentRepository,batchRepository,invigilatorRepository} from '../libs/app/repository/index'
import {fumigation_Usecase,getAllPendingStudents_Usecase,createBatch_Usecase,addStudents_Usecase,getBatchwiseStudents_Usecase,studentsMark_Usecase,invigilatorLogin_Usecase,createInvigilator_Usecase,getAllBatch_Usecase,getStudentsMark_Usecase,removeBatchwiseStudents_Usecase,removeBatch_Usecase,editBatch_Usecase,editBatchSubmit_Usecase,getInvigilators_Usecase,editInvigilator_Usecase,editInvigilatorSubmit_Usecase,removeInvigilator_Usecase,passedStudents_Usecase,failedStudents_Usecase,editStudentMark_Usecase,invigilatorGoogleLogin_Usecase,confirmPassedStudents_Usecase,getAllFumigationStudents_Usecase,updateStudentStatus_Usecase,getPerPageStudent_Usecase,superleadAddStudent_Usecase,getPendingStudents_Usecase} from '../libs/usecase';

const useCase:any = {
   fumigation_Usecase,
   getAllPendingStudents_Usecase,
   createBatch_Usecase,
   addStudents_Usecase,
   getBatchwiseStudents_Usecase,
   studentsMark_Usecase,
   invigilatorLogin_Usecase,
   createInvigilator_Usecase,
   getAllBatch_Usecase,
   getStudentsMark_Usecase,
   removeBatchwiseStudents_Usecase,
   removeBatch_Usecase,
   editBatch_Usecase,
   editBatchSubmit_Usecase,
   getInvigilators_Usecase,
   editInvigilator_Usecase,
   editInvigilatorSubmit_Usecase,
   removeInvigilator_Usecase,
   passedStudents_Usecase,
   failedStudents_Usecase,
   editStudentMark_Usecase,
   invigilatorGoogleLogin_Usecase,
   confirmPassedStudents_Usecase,
   getAllFumigationStudents_Usecase,
   updateStudentStatus_Usecase,
   getPerPageStudent_Usecase,
   superleadAddStudent_Usecase,
   getPendingStudents_Usecase
};
const repository:any={studentRepository,batchRepository,invigilatorRepository}
export default {useCase,repository }