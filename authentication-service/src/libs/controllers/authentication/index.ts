
import createInvigilator_Controller from "./createInvigilatorController"
import studentLogin_Controller from "./studentLoginController"
import reviewerLogin_Controller from "./reviewerLoginController"
import superleadLogin_Controller from "./superleadLoginController"
import getAllStudentsStatus_Controller from "./getAllStudentsStatusController"
import updateStudentStatus_Controller from "./updateStudentStatusController"
import getHubwiseStudentsDetails_Controller from "./getHubwiseStudentsDetailsController"
import getAllReviewersStatus_Controller from "./getAllReviewersStatusController"
import addReviewer_Controller from "./addReviewerController"
export default (dependencies:any)=>{

    return{
        createInvigilatorController: createInvigilator_Controller(dependencies),
        studentLoginController: studentLogin_Controller(dependencies),
        reviewerLoginController: reviewerLogin_Controller(dependencies),
        superleadLoginController: superleadLogin_Controller(dependencies),
        getAllStudentsStatusController: getAllStudentsStatus_Controller(dependencies),
        updateStudentStatusController: updateStudentStatus_Controller(dependencies),
        getHubwiseStudentsDetailsController: getHubwiseStudentsDetails_Controller(dependencies),
        getAllReviewersStatusController: getAllReviewersStatus_Controller(dependencies),
        addReviewerController: addReviewer_Controller(dependencies),
    }
}