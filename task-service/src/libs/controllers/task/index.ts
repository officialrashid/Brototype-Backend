
import updatePersonalWorkout_Controller from "./updatePersonalWorkoutController"
import updateTechnicalWorkout_Controller from "./updateTechnicalWorkoutController"
import updateMiscellaneousWorkout_Controller from "./updateMiscellaneousWorkoutController"
import getUpdateTask_Controller from "./getUpdateTaskController"
import getEditTaskDetails_Controller from "./getEditTaskDetailsController"
import addPersonalWorkoutsTask_Controller from "./addPersonalWorkoutsTaskController"
import getPersonalWorkoutTask_Controller from "./getPersonalWorkoutTaskController"
import addTechnicalWorkoutsTask_Controller from "./addTechnicalWorkoutsTaskController"
import getTechnicalWorkoutTask_Controller from "./getTechnicalWorkoutTaskController "
import addMiscellaneousWorkoutsTask_Controller from "./addMiscellaneousWorkoutsTaskController"
import getMiscellaneousWorkoutTask_Controller from "./getMiscellaneousWorkoutTaskController"
import getWeekTask_Controller from "./getWeekTaskController"
export default (dependencies:any)=>{

    return{
        updatePersonalWorkoutController: updatePersonalWorkout_Controller(dependencies),
        updateTechnicalWorkoutController: updateTechnicalWorkout_Controller(dependencies),
        updateMiscellaneousWorkoutController: updateMiscellaneousWorkout_Controller(dependencies),
        getUpdateTaskController: getUpdateTask_Controller(dependencies),
        getEditTaskDetailsController: getEditTaskDetails_Controller(dependencies),
        addPersonalWorkoutsTaskController: addPersonalWorkoutsTask_Controller(dependencies),
        getPersonalWorkoutTaskController: getPersonalWorkoutTask_Controller(dependencies),
        addTechnicalWorkoutsTaskController: addTechnicalWorkoutsTask_Controller(dependencies),
        getTechnicalWorkoutTaskController: getTechnicalWorkoutTask_Controller(dependencies),
        addMiscellaneousWorkoutsTaskController: addMiscellaneousWorkoutsTask_Controller(dependencies),
        getMiscellaneousWorkoutTaskController: getMiscellaneousWorkoutTask_Controller(dependencies),
        getWeekTaskController: getWeekTask_Controller(dependencies),
    }
}