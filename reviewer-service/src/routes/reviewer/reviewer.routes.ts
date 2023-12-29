import express from "express"
import {reviewer_Controller} from "../../libs/controllers";

export default (dependencies:any)=>{

  const router = express.Router();
  
  const {scheduleTimeController,getScheduleEventsController,updateScheduleEventsController,deleteScheduleEventsController,getDayTimeLineupController,getAllDetailsController} = reviewer_Controller(dependencies) 

  router.post('/schedule-event',scheduleTimeController)
  router.get('/get-schedule-events/:reviewerId',getScheduleEventsController)
  router.patch('/update-event',updateScheduleEventsController)
  router.delete('/delete-event',deleteScheduleEventsController)
  router.get('/get-day-timeLine',getDayTimeLineupController)
  router.get('/get-reviewer-details/:reviewerId',getAllDetailsController)
  return router
}
