import express from "express"
import {fumigation_Controller} from "../../libs/controllers";
import jwt from "jsonwebtoken"
const jwtVerify = require('jwt-verify-token')
// const jwtVerify = require('../../jwtVerify/jwtVerifyMiddleware.js')
export default (dependencies:any)=>{

  const router = express.Router();
  //  import all controll //
  const {fumigationController,getAllPendingStudent,createBatch,addStudents,getBatchwiseStudentsController,studentsMarkController,invigilatorLoginController,createInvigilatorController,getAllBatches,getStudentsMarkController,removeBatchwiseStudentsController,removeBatchController,editBatchController,editBatchSubmitController,getInvigilatorsController,editInvigilatorController,editInvigilatorSubmitController,removeInvigilatorsController,passedStudentsController,failedStudentsController,editStudentMarkController,invigilatorGoogleLoginController} = fumigation_Controller(dependencies) 
// define the all api ..
  router.post('/enquery',fumigationController)
  router.get('/get-enquery',jwtVerify,getAllPendingStudent)
  router.post('/create-batch',jwtVerify,createBatch)
  router.patch('/add-students',jwtVerify,addStudents)
  router.get('/get-batchwise-students',jwtVerify,getBatchwiseStudentsController)
  router.patch('/add-students-mark',jwtVerify,studentsMarkController)
  router.post('/invigilator-login',invigilatorLoginController)
  router.post('/create-invigilator',jwtVerify,createInvigilatorController)
  router.get('/get-all-batches',jwtVerify,getAllBatches)
  router.get('/get-students-mark',jwtVerify,getStudentsMarkController)
  router.delete('/remove-batchwise-students',jwtVerify,removeBatchwiseStudentsController)
  router.delete('/remove-batch',jwtVerify,removeBatchController)
  router.get('/edit-batch',jwtVerify,editBatchController)
  router.patch('/edit-batch-submit',jwtVerify,editBatchSubmitController)
  router.get('/get-all-invigilators',jwtVerify,getInvigilatorsController)
  router.get('/edit-invigilator',jwtVerify,editInvigilatorController)
  router.patch('/edit-invigilator-submit',jwtVerify,editInvigilatorSubmitController)
  router.delete("/remove-invigilators",jwtVerify,removeInvigilatorsController)
  router.get("/get-passed-students",passedStudentsController)
  router.get("/get-failed-students",failedStudentsController)
  router.get('/edit-student-mark',editStudentMarkController)
  router.post('/invigilator-google-login',invigilatorGoogleLoginController)
  return router
}