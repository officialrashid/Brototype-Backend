
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
import passedStudents_Controller from "./batchController/passedStudentsController"
import failedStudents_Controller from "./batchController/failedStudentsController"
import editStudentMark_Controller from "./studentsController/editStudentMarkController"
import invigilatorGoogleLogin_Controller from "./invigilatorController/invigilatorGoogleLoginController"
import confirmPassedStudents_Controller from "./studentsController/confirmPassedStudents"
import getAllFumigationStudents_Controller from "./studentsController/getAllFumigationStudentsController"
import updateStudentStatus_Controller from "./studentsController/updateStudentStatusController"
import getPerPageStudent_Controller from "./studentsController/getPerPageStudentController"
import superleadAddStudent_Controller from "./studentsController/superleadAddStudentController"
import getPendingStudents_Controller from "./studentsController/getPendingStudentsController"
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
        removeInvigilatorsController:removeInvigilators_Controller(dependencies),
        passedStudentsController: passedStudents_Controller(dependencies),
        failedStudentsController: failedStudents_Controller(dependencies),
        editStudentMarkController: editStudentMark_Controller(dependencies),
        invigilatorGoogleLoginController: invigilatorGoogleLogin_Controller(dependencies),
        confirmPassedStudentsController: confirmPassedStudents_Controller(dependencies),
        getAllFumigationStudentsController: getAllFumigationStudents_Controller(dependencies),
        updateStudentStatusController: updateStudentStatus_Controller(dependencies),
        getPerPageStudentController: getPerPageStudent_Controller(dependencies),
        superleadAddStudentController: superleadAddStudent_Controller(dependencies),
        getPendingStudentsController: getPendingStudents_Controller(dependencies)

    }  
}
// import all controller files.()