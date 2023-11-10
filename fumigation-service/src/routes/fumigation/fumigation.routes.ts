import express from "express"
import {fumigation_Controller} from "../../libs/controllers";


export default (dependencies:any)=>{

  const router = express.Router();
  //  import all controll //
  const {fumigationController,getAllPendingStudent,createBatch,addStudents,getBatchwiseStudentsController,studentsMarkController,invigilatorLoginController,createInvigilatorController,getAllBatches,getStudentsMarkController,removeBatchwiseStudentsController,removeBatchController,editBatchController,editBatchSubmitController,getInvigilatorsController,editInvigilatorController,editInvigilatorSubmitController,removeInvigilatorsController} = fumigation_Controller(dependencies) 
// define the all api ..
  router.post('/enquery',fumigationController)
  router.get('/getEnquery',getAllPendingStudent)
  router.post('/createBatch',createBatch)
  router.patch('/addStudents',addStudents)
  router.get('/getBatchwiseStudents',getBatchwiseStudentsController)
  router.patch('/addStudentsMark',studentsMarkController)
  router.post('/invigilatorLogin',invigilatorLoginController)
  router.post('/createInvigilator',createInvigilatorController)
  router.get('/getAllBatches',getAllBatches)
  router.get('/getStudentsMark',getStudentsMarkController)
  router.delete('/removeBatchwiseStudents',removeBatchwiseStudentsController)
  router.delete('/removeBatch',removeBatchController)
  router.get('/editBatch',editBatchController)
  router.patch('/editBatchSubmit',editBatchSubmitController)
  router.get('/getAllInvigilators',getInvigilatorsController)
  router.get('/editInvigilator',editInvigilatorController)
  router.patch('/editInvigilatorSubmit',editInvigilatorSubmitController)
  router.delete("/removeInvigilators",removeInvigilatorsController)
  return router
}