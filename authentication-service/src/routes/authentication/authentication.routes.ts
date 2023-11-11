import express from "express"
import {authentication_Controller} from "../../libs/controllers";

export default (dependencies:any)=>{

  const router = express.Router();
  
  const {createInvigilatorController} = authentication_Controller(dependencies) 

  router.post('/createInvigilator',createInvigilatorController)
  return router
}