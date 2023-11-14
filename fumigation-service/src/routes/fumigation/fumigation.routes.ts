import express from "express"
import {fumigation_Controller} from "../../libs/controllers";
import jwt from "jsonwebtoken"
// const jwtVerify = require('jwt-verify-token')
const jwtVerify = require('../../jwtVerify/jwtVerifyMiddleware.js')
export default (dependencies:any)=>{

  const router = express.Router();
  //  import all controll //
  const {fumigationController,getAllPendingStudent,createBatch,addStudents,getBatchwiseStudentsController,studentsMarkController,invigilatorLoginController,createInvigilatorController,getAllBatches,getStudentsMarkController,removeBatchwiseStudentsController,removeBatchController,editBatchController,editBatchSubmitController,getInvigilatorsController,editInvigilatorController,editInvigilatorSubmitController,removeInvigilatorsController} = fumigation_Controller(dependencies) 
// define the all api ..
  router.post('/enquery',fumigationController)
  router.get('/get-enquery',getAllPendingStudent)
  router.post('/create-batch',createBatch)
  router.patch('/add-students',addStudents)
  router.get('/get-batchwise-students',getBatchwiseStudentsController)
  router.patch('/add-students-mark',studentsMarkController)
  router.post('/invigilator-login',invigilatorLoginController)
  router.post('/create-invigilator',createInvigilatorController)
  router.get('/get-all-batches',getAllBatches)
  router.get('/get-students-mark',getStudentsMarkController)
  router.delete('/remove-batchwise-students',removeBatchwiseStudentsController)
  router.delete('/remove-batch',removeBatchController)
  router.get('/edit-batch',editBatchController)
  router.patch('/edit-batch-submit',editBatchSubmitController)
  router.get('/get-all-invigilators',getInvigilatorsController)
  router.get('/edit-invigilator',editInvigilatorController)
  router.patch('/edit-invigilator-submit',editInvigilatorSubmitController)
  router.delete("/remove-invigilators",removeInvigilatorsController)
  return router
}