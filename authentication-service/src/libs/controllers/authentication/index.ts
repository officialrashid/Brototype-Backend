
import createInvigilator_Controller from "./createInvigilatorController"
import studentLogin_Controller from "./studentLoginController"
import reviewerLogin_Controller from "./reviewerLoginController"
import superleadLogin_Controller from "./superleadLoginController"
import getAllStudentsStatus_Controller from "./getAllStudentsStatusController"
import updateStudentStatus_Controller from "./updateStudentStatusController"
import getHubwiseStudentsDetails_Controller from "./getHubwiseStudentsDetailsController"
import getAllReviewersStatus_Controller from "./getAllReviewersStatusController"
import addReviewer_Controller from "./addReviewerController"
import updateReviewerStatus_Controller from "./updateReviewerStatusController"
import addStudent_Controller from "./addStudentController"
import getSuperleadHub_Controller from "./getSuperleadHubController"
import updateStudentPlaced_Controller from "./updateStudentPlacedController"
import getStudentsAndPlacedStudents_Controller from "./getStudentsAndPlacedStudentsController"
import getPerPageStudentStatus_Controller from "./getPerPageStudentStatusController"
import addAdvisor_Controller from "./addAdvisorController"
import advisorLogin_Controller from "./advisorLoginController"
import getStdDashboardDetails_Controller from "./getStdDashboardDetailsController"
import getAdvisorDetails_Controller from "./getAdvisorDetailsController"
import getAllAdvisors_Controller from "./getAllAdvisorsController"
import updateAdvisorStatus_Controller from "./updateAdvisorStatusController"
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
        updateReviewerStatusController: updateReviewerStatus_Controller(dependencies),
        addStudentController: addStudent_Controller(dependencies),
        getSuperleadHubController: getSuperleadHub_Controller(dependencies),
        updateStudentPlacedController: updateStudentPlaced_Controller(dependencies),
        getStudentsAndPlacedStudentsController: getStudentsAndPlacedStudents_Controller(dependencies),
        getPerPageStudentStatusController: getPerPageStudentStatus_Controller(dependencies),
        addAdvisorController: addAdvisor_Controller(dependencies),
        advisorLoginController: advisorLogin_Controller(dependencies),
        getStdDashboardDetailsController: getStdDashboardDetails_Controller(dependencies),
        getAdvisorDetailsController: getAdvisorDetails_Controller(dependencies),
        getAllAdvisorsController: getAllAdvisors_Controller(dependencies),
        updateAdvisorStatusController: updateAdvisorStatus_Controller(dependencies),

    }
}