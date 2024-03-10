import { chatAndVideoRepository} from '../libs/app/repository/index'
import {createChat_Usecase,} from '../libs/usecase';

const useCase:any = {

   createChat_Usecase,

};
const repository:any={chatAndVideoRepository}
export default {useCase,repository }