import express from "express"
import {students_controller} from "../../libs/controllers";
import multer, {memoryStorage} from 'multer'
import {profileUpdateValidationRules} from "../../input-validation/profileUpdateValidation"
const storage = memoryStorage();
const upload = multer({storage})
export default (dependencies:any)=>{

  const router = express.Router();
  
  const {profileUpdateController,getProfileController} = students_controller(dependencies) 

  router.post('/profile-update',upload.single("image"),profileUpdateValidationRules,profileUpdateController)

  router.get('/get-profile/:studentId',getProfileController)
  return router
}


