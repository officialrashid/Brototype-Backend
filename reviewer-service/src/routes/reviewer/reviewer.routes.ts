import express from "express"
import {reviewer_Controller} from "../../libs/controllers";
import multer, {memoryStorage} from 'multer'

const storage = memoryStorage();
const upload = multer({storage})
export default (dependencies:any)=>{

  const router = express.Router();
  
  const {scheduleTimeController,getScheduleEventsController,updateScheduleEventsController,deleteScheduleEventsController,getDayTimeLineupController,getAllDetailsController,profileUpdateController,updateWorkDetailsController,getReviewerProfileController} = reviewer_Controller(dependencies) 

  router.post('/schedule-event',scheduleTimeController)
  router.get('/get-schedule-events/:reviewerId',getScheduleEventsController)
  router.patch('/update-event',updateScheduleEventsController)
  router.delete('/delete-event',deleteScheduleEventsController)
  router.get('/get-day-timeLine',getDayTimeLineupController)
  router.get('/get-reviewer-details/:reviewerId',getAllDetailsController)
  router.post('/profile-update',upload.single("image"),profileUpdateController)
  router.post('/update-work-details',updateWorkDetailsController)
  router.get('/get-reviewer-profile/:reviewerId',getReviewerProfileController)
  return router
}
