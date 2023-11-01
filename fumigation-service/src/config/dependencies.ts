import { fumigationRepository} from '../libs/app/repository/index'
import {fumigation_Usecase,getAllPendingStudents_Usecase,createBatch_Usecase,addStudents_Usecase,getBatchwiseStudents_Usecase,studentsMark_Usecase} from '../libs/usecase';

const useCase:any = {
   fumigation_Usecase,
   getAllPendingStudents_Usecase,
   createBatch_Usecase,
   addStudents_Usecase,
   getBatchwiseStudents_Usecase,
   studentsMark_Usecase
};
const repository:any={fumigationRepository}
export default {useCase,repository }