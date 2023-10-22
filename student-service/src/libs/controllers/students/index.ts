
import student_Controller from "./studentsController"

export default (dependencies:any)=>{

    return{
        studentController: student_Controller(dependencies)
    }
}