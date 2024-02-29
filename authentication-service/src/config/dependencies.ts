import { authenticationRepository} from '../libs/app/repository/index'
import {createInvigilator_Usecase,checkStudentUniqueId_Usecase,studentLogin_Usecase,reviewerLogin_Usecase,superleadLogin_Usecase} from '../libs/usecase';

const useCase:any = {
   createInvigilator_Usecase,
   checkStudentUniqueId_Usecase,
   studentLogin_Usecase,
   reviewerLogin_Usecase,
   superleadLogin_Usecase
};
const repository:any={authenticationRepository}
export default {useCase,repository }