import { superleadRepository} from '../libs/app/repository/index'
import {profileUpdate_Usecase,} from '../libs/usecase';

const useCase:any = {
   profileUpdate_Usecase,

};
const repository:any={superleadRepository}
export default {useCase,repository }