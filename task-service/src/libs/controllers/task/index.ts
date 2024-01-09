
import updatePersonalWorkout_Controller from "./updatePersonalWorkoutController"
import updateTechnicalWorkout_Controller from "./updateTechnicalWorkoutController"
import updateMiscellaneousWorkout_Controller from "./updateMiscellaneousWorkoutController"
import getUpdateTask_Controller from "./getUpdateTaskController"
import getEditTaskDetails_Controller from "./getEditTaskDetailsController"

export default (dependencies:any)=>{

    return{
        updatePersonalWorkoutController: updatePersonalWorkout_Controller(dependencies),
        updateTechnicalWorkoutController: updateTechnicalWorkout_Controller(dependencies),
        updateMiscellaneousWorkoutController: updateMiscellaneousWorkout_Controller(dependencies),
        getUpdateTaskController: getUpdateTask_Controller(dependencies),
        getEditTaskDetailsController: getEditTaskDetails_Controller(dependencies),
    }
}