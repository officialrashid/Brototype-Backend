
import fumigation_Controller from "./studentsController/fumigationController"
import getAll_PendingStudents from "./studentsController/getAllPendingStudents"
import create_Batch from "./batchController/createBatch"
import add_Students from "./studentsController/addStudentsController"
import getBatchwiseStudents_Controller from "./studentsController/getBatchwiseStudentsController"
import studentsMark_Controller from "./studentsController/studentsMarkController"
import invigilatorLogin_Controller from "./invigilatorController/invigilatorLoginController"
import createInvigilator_Controller from "./invigilatorController/createInvigilatorController"
import getAll_Batches from "./batchController/getAllBatches"
import getStudentsMark_Controller from "./studentsController/getStudentsMarkController"
import removeBatchwiseStudents_Controller from "./studentsController/removeBatchwiseStudentsController"
import removeBatch_Controller from "./batchController/removeBatchController"
import editBatch_Controller from "./batchController/editBatchController"
import editBatchSubmit_Controller from "./batchController/editBatchSubmitController"
import getInvigilators_Controller from "./invigilatorController/getInvigilatorsController"
import editInvigilator_Controller from "./invigilatorController/editInvigilatorController"
import editInvigilatorSubmit_Controller from "./invigilatorController/editInvigilatorSubmitController"
import removeInvigilators_Controller from "./invigilatorController/removeInvigilatorsController"
export default (dependencies:any)=>{

    return{
        fumigationController: fumigation_Controller(dependencies),
        getAllPendingStudent: getAll_PendingStudents(dependencies),
        createBatch: create_Batch(dependencies),
        addStudents: add_Students(dependencies),
        getBatchwiseStudentsController: getBatchwiseStudents_Controller(dependencies),
        studentsMarkController: studentsMark_Controller(dependencies),
        invigilatorLoginController: invigilatorLogin_Controller(dependencies),
        createInvigilatorController: createInvigilator_Controller(dependencies),
        getAllBatches : getAll_Batches(dependencies),
        getStudentsMarkController: getStudentsMark_Controller(dependencies),
        removeBatchwiseStudentsController: removeBatchwiseStudents_Controller(dependencies),
        removeBatchController: removeBatch_Controller(dependencies),
        editBatchController: editBatch_Controller(dependencies),
        editBatchSubmitController: editBatchSubmit_Controller(dependencies),
        getInvigilatorsController: getInvigilators_Controller(dependencies),
        editInvigilatorController: editInvigilator_Controller(dependencies),
        editInvigilatorSubmitController: editInvigilatorSubmit_Controller(dependencies),
        removeInvigilatorsController:removeInvigilators_Controller(dependencies)
    }  
}
// import all controller files.()