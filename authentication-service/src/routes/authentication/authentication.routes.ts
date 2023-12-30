import express from "express"
import {authentication_Controller} from "../../libs/controllers";

export default (dependencies:any)=>{

  const router = express.Router();
  
  const {createInvigilatorController,studentLoginController,reviewerLoginController} = authentication_Controller(dependencies) 

  router.post('/createInvigilator',createInvigilatorController)
  router.post('/student-login',studentLoginController)
  router.post('/reviewer-login',reviewerLoginController)
  return router
}