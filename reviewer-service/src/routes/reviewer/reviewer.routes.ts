import express from "express"
import {reviewer_Controller} from "../../libs/controllers";

export default (dependencies:any)=>{

  const router = express.Router();
  
  const {createInvigilatorController} = reviewer_Controller(dependencies) 

  router.post('/createInvigilator',createInvigilatorController)
  return router
}