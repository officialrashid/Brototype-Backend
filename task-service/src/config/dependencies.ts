import { taskRepository} from '../libs/app/repository/index'
import {updatePersonalWorkout_Usecase} from '../libs/usecase';

const useCase:any = {
   updatePersonalWorkout_Usecase,
};
const repository:any={taskRepository}
export default {useCase,repository }