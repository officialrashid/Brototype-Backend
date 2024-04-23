import express from "express"
import {students_controller} from "../../libs/controllers";
import multer, {memoryStorage} from 'multer'
const storage = memoryStorage();
const upload = multer({storage})
import { profileUpdateValidationRules } from "../../input-validation/profileUpdateValidation"
import verifyTokenMiddleware from "../../custom-token/custom-tokenverify";
const jwtVerification = require('jwt-verify-token');
const secretKey = 'secretidofAccessTokenjwt';

export default (dependencies:any)=>{

  const router = express.Router();
  
  const {profileUpdateController,getProfileController,updatePersonalDetailsController,updateAddressDetailsController,updateEducationDetailsController,getBacthwiseBestStdController,getWeeklyPerformanceController,getCourseCompletionController,getAllPerformanceController,getExtendDetailsController,requestExtentionController,getExtendRequestController,getReviewDetailsController,secondExtendRequestController,governmentIdUpdateController,getAllStudentsController,getPerPageStudentController,getAllChatStudentsController,addReviewResultController,getReviewStudentsController} = students_controller(dependencies) 

  router.post('/profile-update',upload.single("image"),profileUpdateValidationRules,profileUpdateController)

  // router.get('/get-profile/:studentId', jwtVerification(secretKey), getProfileController);
  router.get('/get-profile/:studentId', getProfileController);
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
  router.post('/second-extend-request/:extendId',secondExtendRequestController)
  router.post('/update-governmentId',upload.single("image"),governmentIdUpdateController)
  router.get('/get-all-students',getAllStudentsController)
  router.get('/get-per-page-students',getPerPageStudentController)
  router.get('/get-all-chat-students/:uniqueId',getAllChatStudentsController)
  router.post('/add-student-review-result',addReviewResultController)
  router.get('/get-review-students',getReviewStudentsController)
  return router
}


