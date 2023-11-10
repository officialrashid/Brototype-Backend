
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
        removeBatchwiseStudentsController: removeBatchwiseStudents_Controller(dependencies)
    }  
}
// import all controller files.()