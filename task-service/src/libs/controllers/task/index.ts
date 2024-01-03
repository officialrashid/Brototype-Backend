
import updatePersonalWorkout_Controller from "./updatePersonalWorkoutController"


export default (dependencies:any)=>{

    return{
        updatePersonalWorkoutController: updatePersonalWorkout_Controller(dependencies),

    }
}