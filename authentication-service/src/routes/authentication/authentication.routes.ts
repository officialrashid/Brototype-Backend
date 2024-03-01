import express from "express"
import {authentication_Controller} from "../../libs/controllers";

export default (dependencies:any)=>{

  const router = express.Router();
  
  const {createInvigilatorController,studentLoginController,reviewerLoginController,superleadLoginController,getAllStudentsStatusController,updateStudentStatusController} = authentication_Controller(dependencies) 

  router.post('/createInvigilator',createInvigilatorController)
  router.post('/student-login',studentLoginController)
  router.post('/reviewer-login',reviewerLoginController)
  router.post('/superlead-login',superleadLoginController)
  router.get('/get-all-students-status/:uniqueId',getAllStudentsStatusController)
  router.patch('/update-student-status',updateStudentStatusController)
  return router
}
