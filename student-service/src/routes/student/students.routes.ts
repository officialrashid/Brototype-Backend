import express from "express"
import {students_controller} from "../../libs/controllers";
import multer, {memoryStorage} from 'multer'
import {profileUpdateValidationRules} from "../../input-validation/profileUpdateValidation"
const storage = memoryStorage();
const upload = multer({storage})
export default (dependencies:any)=>{

  const router = express.Router();
  
  const {profileUpdateController,getProfileController,updatePersonalDetailsController,updateAddressDetailsController,updateEducationDetailsController,getBacthwiseBestStdController,getWeeklyPerformanceController,getCourseCompletionController,getAllPerformanceController,getExtendDetailsController,requestExtentionController,getExtendRequestController,getReviewDetailsController} = students_controller(dependencies) 

  router.post('/profile-update',upload.single("image"),profileUpdateValidationRules,profileUpdateController)

  router.get('/get-profile/:studentId',getProfileController)
  router.post('/update-personal-details',updatePersonalDetailsController)
  router.post('/update-address-details',updateAddressDetailsController)
  router.post('/update-education-details',updateEducationDetailsController)
  router.get('/get-best-students/:batchId',getBacthwiseBestStdController)
  router.get('/get-weekly-performance',getWeeklyPerformanceController)
  router.get('/get-course-completion',getCourseCompletionController)
  router.get('/get-all-performance',getAllPerformanceController)
  router.get('/get-extend-details',getExtendDetailsController)
  router.post('/request-extention',requestExtentionController)
  router.get('/get-request-extend/:studentId',getExtendRequestController)
  router.get('/get-review-details',getReviewDetailsController)
  return router
}


