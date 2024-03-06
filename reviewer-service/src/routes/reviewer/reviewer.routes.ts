import express from "express"
import {reviewer_Controller} from "../../libs/controllers";
import multer, {memoryStorage} from 'multer'
import verifyTokenMiddleware from "../../custom-token/custom-tokenverify";
const jwtVerification = require('jwt-verify-token');
const secretKey = 'secretidofAccessTokenjwt';
const storage = memoryStorage();
const upload = multer({storage})
export default (dependencies:any)=>{

  const router = express.Router();
  
  const {scheduleTimeController,getScheduleEventsController,updateScheduleEventsController,deleteScheduleEventsController,getDayTimeLineupController,getAllDetailsController,profileUpdateController,updateWorkDetailsController,getReviewerProfileController,reviewTakeCountController,getAllReviewersProfileController,getBestReviewersController,getReviewCountAnalyzeController} = reviewer_Controller(dependencies) 

  router.post('/schedule-event',scheduleTimeController)
  router.get('/get-schedule-events/:reviewerId',getScheduleEventsController)
  router.patch('/update-event',updateScheduleEventsController)
  router.delete('/delete-event',deleteScheduleEventsController)
  router.get('/get-day-timeLine',getDayTimeLineupController)
  router.get('/get-reviewer-details/:reviewerId',getAllDetailsController)
  router.get('/review-take-count/:reviewerId',reviewTakeCountController)
  router.post('/profile-update',upload.single("image"),profileUpdateController)
  router.post('/update-work-details',updateWorkDetailsController)
  router.get('/get-reviewer-profile/:reviewerId',getReviewerProfileController)
  router.get('/get-all-reviewers-profile',getAllReviewersProfileController)
  router.get('/get-best-reviewers',getBestReviewersController)
  router.get('/get-review-count-analyze',getReviewCountAnalyzeController)
  return router
}
