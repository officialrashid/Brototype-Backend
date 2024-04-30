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
  
  const {scheduleTimeController,getScheduleEventsController,updateScheduleEventsController,deleteScheduleEventsController,getDayTimeLineupController,getAllDetailsController,profileUpdateController,updateWorkDetailsController,getReviewerProfileController,reviewTakeCountController,getAllReviewersProfileController,getBestReviewersController,getReviewCountAnalyzeController,getPerPageReviewersController,getAllChatReviewersController,getParticularEventsController,updateParticularEventsController,cancelParticularEventsController,getDomainWiseReviewersController,updateReviewCompletedController,getReviewesController} = reviewer_Controller(dependencies) 

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
  router.get('/get-all-reviewers-profile/:currentPage',getAllReviewersProfileController)
  router.get('/get-best-reviewers',getBestReviewersController)
  router.get('/get-review-count-analyze',getReviewCountAnalyzeController)
  router.get('/get-per-page-reviewers/:perPage',getPerPageReviewersController)
  router.get('/get-all-chat-reviewers',getAllChatReviewersController)
  router.get('/get-particular-date-events/:reviewerId',getParticularEventsController)
  router.patch('/update-particular-date-events',updateParticularEventsController)
  router.patch('/cancel-particular-date-events',cancelParticularEventsController)
  router.get('/get-domain-wise-reviewer/:domain',getDomainWiseReviewersController)
  router.patch('/update-review-completed-status',updateReviewCompletedController)
  router.get('/get-reviewes/:reviewerId',getReviewesController)
  return router
}
