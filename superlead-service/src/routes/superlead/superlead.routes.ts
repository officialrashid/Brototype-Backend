import express from "express"
import {superlead_Controller} from "../../libs/controllers";

export default (dependencies:any)=>{

  const router = express.Router();
  
  const {createInvigilatorController,studentLoginController,reviewerLoginController} = superlead_Controller(dependencies) 

  router.post('/createInvigilator',createInvigilatorController)
  router.post('/student-login',studentLoginController)
  router.post('/reviewer-login',reviewerLoginController)
  return router
}