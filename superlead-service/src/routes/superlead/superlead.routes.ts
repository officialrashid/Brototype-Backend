import express from "express"
import {superlead_Controller} from "../../libs/controllers";
import multer, {memoryStorage} from 'multer'
const storage = memoryStorage();
const upload = multer({storage})
export default (dependencies:any)=>{

  const router = express.Router();
  
  const {profileUpdateController,getProfileController} = superlead_Controller(dependencies) 

  router.post('/profile-update',upload.single("image"),profileUpdateController)
  router.get('/get-superlead-profile/:superleadId',getProfileController)

  return router
}
