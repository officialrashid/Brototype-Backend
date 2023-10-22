import express from "express"
import {advisor_Controller} from "../../libs/controllers";

export default (dependencies:any)=>{

  const router = express.Router();
  
  const {advisorController} = advisor_Controller(dependencies) 

  router.post('/advisors',advisorController)
  return router
}