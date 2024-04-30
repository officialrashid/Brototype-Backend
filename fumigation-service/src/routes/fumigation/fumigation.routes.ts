import express from "express"
import {fumigation_Controller} from "../../libs/controllers";
import jwt from "jsonwebtoken"
import confirmPassedStudents from "../../libs/controllers/fumigation/studentsController/confirmPassedStudents";
const jwtVerify = require('jwt-verify-token')
// const = require('../..Middleware.js')
export default (dependencies:any)=>{

  const router = express.Router();
  //  import all controll //
  const {fumigationController,getAllPendingStudent,createBatch,addStudents,getBatchwiseStudentsController,studentsMarkController,invigilatorLoginController,createInvigilatorController,getAllBatches,getStudentsMarkController,removeBatchwiseStudentsController,removeBatchController,editBatchController,editBatchSubmitController,getInvigilatorsController,editInvigilatorController,editInvigilatorSubmitController,removeInvigilatorsController,passedStudentsController,failedStudentsController,editStudentMarkController,invigilatorGoogleLoginController,confirmPassedStudentsController,getAllFumigationStudentsController,updateStudentStatusController,getPerPageStudentController,superleadAddStudentController,getPendingStudentsController} = fumigation_Controller(dependencies) 
// define the all api ..
  router.post('/enquery',fumigationController) //
  router.get('/get-enquery',getAllPendingStudent) //
  router.post('/create-batch',createBatch) //
  router.patch('/add-students',addStudents)

  router.get('/get-batchwise-students/:batchId',getBatchwiseStudentsController)
  router.patch('/add-students-mark',studentsMarkController)
  router.post('/invigilator-login',invigilatorLoginController) //
  router.post('/create-invigilator',createInvigilatorController) //
  router.get('/get-all-batches',getAllBatches)
 
  router.get('/get-students-mark',getStudentsMarkController)
  router.delete('/remove-batchwise-students',removeBatchwiseStudentsController)
  router.delete('/remove-batch',removeBatchController)
  router.get('/edit-batch/:batchId',editBatchController)
  router.patch('/edit-batch-submit',editBatchSubmitController)
  router.get('/get-all-invigilators',getInvigilatorsController)
  router.get('/edit-invigilator',editInvigilatorController)
  router.patch('/edit-invigilator-submit',editInvigilatorSubmitController)
  router.delete("/remove-invigilators/:invigilatorId",removeInvigilatorsController)
  router.get("/get-passed-students",passedStudentsController)
  router.get("/get-failed-students",failedStudentsController)
  router.get('/edit-student-mark',editStudentMarkController)
  router.post('/invigilator-google-login',invigilatorGoogleLoginController)
  router.post('/confirm-passed-students',confirmPassedStudentsController)
  router.get('/get-all-fumigation-students',getAllFumigationStudentsController)
  router.patch('/update-student-status',updateStudentStatusController)
  router.get('/get-per-page-students',getPerPageStudentController)
  router.post('/superlead-add-student',superleadAddStudentController)
  router.get('/get-pending-students/:uniqueId',getPendingStudentsController)
  return router
}
