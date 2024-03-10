import express from "express"
import {chatAndVideo_Controller} from "../../libs/controllers";
import multer, {memoryStorage} from 'multer'
const storage = memoryStorage();
const upload = multer({storage})
export default (dependencies:any)=>{

  const router = express.Router();
  
  const {getProfileController} = chatAndVideo_Controller(dependencies) 


  router.get('/get-superlead-profile/:superleadId',getProfileController)


  return router
}
