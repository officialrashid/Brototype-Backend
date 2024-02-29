
import createInvigilator_Controller from "./createInvigilatorController"
import studentLogin_Controller from "./studentLoginController"
import reviewerLogin_Controller from "./reviewerLoginController"
import superleadLogin_Controller from "./superleadLoginController"

export default (dependencies:any)=>{

    return{
        createInvigilatorController: createInvigilator_Controller(dependencies),
        studentLoginController: studentLogin_Controller(dependencies),
        reviewerLoginController: reviewerLogin_Controller(dependencies),
        superleadLoginController: superleadLogin_Controller(dependencies),
    }
}