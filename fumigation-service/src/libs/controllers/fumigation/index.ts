
import fumigation_Controller from "./fumigationController"
import getAll_PendingStudents from "./getAllPendingStudents"
import create_Batch from "./createBatch"
import add_Students from "./addStudentsController"
import getBatchwiseStudents_Controller from "./getBatchwiseStudentsController"
import studentsMark_Controller from "./studentsMarkController"
import invigilatorLogin_Controller from "./invigilatorLoginController"
import createInvigilator_Controller from "./createInvigilatorController"
import getAll_Batches from "./getAllBatches"
import getStudentsMark_Controller from "./getStudentsMarkController"
import removeBatchwiseStudents_Controller from "./removeBatchwiseStudentsController"
import removeBatch_Controller from "./removeBatchController"
import editBatch_Controller from "./editBatchController"
import editBatchSubmit_Controller from "./editBatchSubmitController"
import getInvigilators_Controller from "./getInvigilatorsController"
import editInvigilator_Controller from "./editInvigilatorController"
import editInvigilatorSubmit_Controller from "./editInvigilatorSubmitController"
import removeInvigilators_Controller from "./removeInvigilatorsController"
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