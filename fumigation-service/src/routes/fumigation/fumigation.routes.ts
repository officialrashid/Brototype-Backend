import express from "express"
import {fumigation_Controller} from "../../libs/controllers";


export default (dependencies:any)=>{

  const router = express.Router();
  
  const {fumigationController,getAllPendingStudent,createBatch,addStudents,getBatchwiseStudentsController,studentsMarkController} = fumigation_Controller(dependencies) 

  router.post('/enquery',fumigationController)
  router.get('/getEnquery',getAllPendingStudent)
  router.post('/createBatch',createBatch)
  router.patch('/addStudents',addStudents)
  router.get('/getBatchwiseStudents',getBatchwiseStudentsController)
  router.post('/addStudentsMark',studentsMarkController)
  return router
}