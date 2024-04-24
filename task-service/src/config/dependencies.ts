import { taskRepository} from '../libs/app/repository/index'
import {updatePersonalWorkout_Usecase,updateTechnicalWorkout_Usecase,updateMiscellaneousWorkout_Usecase,getUpdateTask_Usecase,getEditTaskDetails_Usecase,addPersonalWorkoutsTask_Usecase,getPersonalWorkoutTask_Usecase,addTechnicalWorkoutsTask_Usecase,getTechnicalWorkoutTask_Usecase,addMiscellaneousWorkoutsTask_Usecase,getMiscellaneousWorkoutTask_Usecase,getWeekTask_Usecase} from '../libs/usecase';

const useCase:any = {
   updatePersonalWorkout_Usecase,
   updateTechnicalWorkout_Usecase,
   updateMiscellaneousWorkout_Usecase,
   getUpdateTask_Usecase,
   getEditTaskDetails_Usecase,
   addPersonalWorkoutsTask_Usecase,
   getPersonalWorkoutTask_Usecase,
   addTechnicalWorkoutsTask_Usecase,
   getTechnicalWorkoutTask_Usecase,
   addMiscellaneousWorkoutsTask_Usecase,
   getMiscellaneousWorkoutTask_Usecase,
   getWeekTask_Usecase
};
const repository:any={taskRepository}
export default {useCase,repository }