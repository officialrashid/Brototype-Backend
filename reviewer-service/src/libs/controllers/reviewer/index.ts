
import createInvigilator_Controller from "./createInvigilatorController"

export default (dependencies:any)=>{

    return{
        createInvigilatorController: createInvigilator_Controller(dependencies)
    }
}