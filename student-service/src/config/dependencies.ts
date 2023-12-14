import { studentsRepository} from '../libs/app/repository/index'
import {profileUpdate_Usecase,getProfile_Usecase } from '../libs/usecase';

const useCase:any = {
   profileUpdate_Usecase,
   getProfile_Usecase
};
const repository:any={studentsRepository}
export default {useCase,repository }