import express from "express"
import {task_Controller} from "../../libs/controllers";

export default (dependencies:any)=>{

  const router = express.Router();
  
  const {updatePersonalWorkoutController,updateTechnicalWorkoutController,updateMiscellaneousWorkoutController,getUpdateTaskController,getEditTaskDetailsController,addPersonalWorkoutsTaskController,getPersonalWorkoutTaskController,addTechnicalWorkoutsTaskController,getTechnicalWorkoutTaskController,addMiscellaneousWorkoutsTaskController,getMiscellaneousWorkoutTaskController,getWeekTaskController} = task_Controller(dependencies) 

  router.post('/update-personal-workout',updatePersonalWorkoutController)
  router.post('/update-technical-workout',updateTechnicalWorkoutController)
  router.post('/update-miscellaneous-workout',updateMiscellaneousWorkoutController)
  router.get('/get-update-task/:studentId',getUpdateTaskController)
  router.get('/get-edit-task-details',getEditTaskDetailsController)
  router.post('/add-personalWorkout-task',addPersonalWorkoutsTaskController)
  router.post('/add-technicalWorkout-task',addTechnicalWorkoutsTaskController)
  router.post('/add-miscellaneousWorkout-task',addMiscellaneousWorkoutsTaskController)
  router.get('/get-personalWorkout-task/:week',getPersonalWorkoutTaskController)
  router.get('/get-miscellaneousWorkout-task/:week',getMiscellaneousWorkoutTaskController)
  router.get('/get-technicalWorkout-task',getTechnicalWorkoutTaskController)
  router.get('/get-student-week-task',getWeekTaskController)
  return router
}
