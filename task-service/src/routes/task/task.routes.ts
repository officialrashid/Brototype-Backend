import express from "express"
import {task_Controller} from "../../libs/controllers";

export default (dependencies:any)=>{

  const router = express.Router();
  
  const {updatePersonalWorkoutController,updateTechnicalWorkoutController,updateMiscellaneousWorkoutController,getUpdateTaskController} = task_Controller(dependencies) 

  router.post('/update-personal-workout',updatePersonalWorkoutController)
  router.post('/update-technical-workout',updateTechnicalWorkoutController)
  router.post('/update-miscellaneous-workout',updateMiscellaneousWorkoutController)
  router.get('/get-update-task/:studentId',getUpdateTaskController)
  return router
}
