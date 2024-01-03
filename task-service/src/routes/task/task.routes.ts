import express from "express"
import {task_Controller} from "../../libs/controllers";

export default (dependencies:any)=>{

  const router = express.Router();
  
  const {updatePersonalWorkoutController} = task_Controller(dependencies) 

  router.post('/update-personal-workout',updatePersonalWorkoutController)

  return router
}