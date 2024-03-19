import express from "express"
import {superlead_Controller} from "../../libs/controllers";
import multer, {memoryStorage} from 'multer'
const storage = memoryStorage();
const upload = multer({storage})
export default (dependencies:any)=>{

  const router = express.Router();
  
  const {profileUpdateController,getProfileController,patchProfileController,getChatAllSuperleadsController,updateActivityEventController,getActivityEventsController,getActivityTimeLineupController,EditActivityEventController,deleteActivityEventController} = superlead_Controller(dependencies) 

  router.post('/profile-update',upload.single("image"),profileUpdateController)
  router.get('/get-superlead-profile/:superleadId',getProfileController)
  router.patch('/update-superlead-profile',upload.single("image"),patchProfileController)
  router.get('/get-chat-all-superleads',getChatAllSuperleadsController)
  router.post('/create-activity-event',updateActivityEventController)
  router.get('/get-activity-events/:superleadId',getActivityEventsController)
  router.get('/get-activity-timelineup/:superleadId',getActivityTimeLineupController)
  router.patch('/update-activity-event',EditActivityEventController)
  router.delete('/delete-activity-event',deleteActivityEventController)
  return router
}
