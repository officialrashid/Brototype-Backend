import { superleadRepository} from '../libs/app/repository/index'
import {createInvigilator_Usecase,checkStudentUniqueId_Usecase} from '../libs/usecase';

const useCase:any = {
   createInvigilator_Usecase,
   checkStudentUniqueId_Usecase,

};
const repository:any={superleadRepository}
export default {useCase,repository }