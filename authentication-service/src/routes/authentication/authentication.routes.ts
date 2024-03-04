import express from "express"
import {authentication_Controller} from "../../libs/controllers";

export default (dependencies:any)=>{

  const router = express.Router();
  
  const {createInvigilatorController,studentLoginController,reviewerLoginController,superleadLoginController,getAllStudentsStatusController,updateStudentStatusController,getHubwiseStudentsDetailsController,getAllReviewersStatusController,addReviewerController,updateReviewerStatusController,addStudentController,getSuperleadHubController} = authentication_Controller(dependencies) 

  router.post('/createInvigilator',createInvigilatorController)
  router.post('/student-login',studentLoginController)
  router.post('/reviewer-login',reviewerLoginController)
  router.post('/superlead-login',superleadLoginController)
  router.get('/get-all-students-status/:uniqueId',getAllStudentsStatusController)
  router.patch('/update-student-status',updateStudentStatusController)
  router.patch('/update-reviewer-status',updateReviewerStatusController)
  router.get('/get-hubwise-students-details/:uniqueId',getHubwiseStudentsDetailsController)
  router.get('/get-all-reviewers-status',getAllReviewersStatusController)
  router.post('/add-reviewer',addReviewerController)
  router.post('/add-student',addStudentController)
  router.get('/get-superlead-hub-location/:uniqueId',getSuperleadHubController)
  return router
}
