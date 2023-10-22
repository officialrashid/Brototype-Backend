import express from "express"
import {student_Controller} from "../../libs/controllers";

export default (dependencies:any)=>{

  const router = express.Router();
  
  const {studentController} = student_Controller(dependencies) 

  router.post('/students',studentController)
  return router
}