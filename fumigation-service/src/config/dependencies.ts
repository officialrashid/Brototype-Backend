import { fumigationRepository} from '../libs/app/repository/index'
import {fumigation_Usecase,getAllPendingStudents_Usecase,createBatch_Usecase,addStudents_Usecase,getBatchwiseStudents_Usecase,studentsMark_Usecase,invigilatorLogin_Usecase,createInvigilator_Usecase,getAllBatch_Usecase,getStudentsMark_Usecase,removeBatchwiseStudents_Usecase,removeBatch_Usecase,editBatch_Usecase,editBatchSubmit_Usecase} from '../libs/usecase';

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
   editBatchSubmit_Usecase
};
const repository:any={fumigationRepository}
export default {useCase,repository }