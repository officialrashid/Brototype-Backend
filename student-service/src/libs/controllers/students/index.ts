
import profileUpdate_Controller from "./profileUpdateController"
import getProfile_Controller from "./getProfileController"
import updatePersonalDetails_Controller from "./updatePersonalDetailsController"
import updateAddressDetails_Controller from "./updateAddressDetailsController"
import updateEducationDetails_Controller from "./updateEducationDetailsController"
import getBacthwiseBestStd_Controller from "./getBacthwiseBestStdController"
import getWeeklyPerformance_Controller from "./getWeeklyPerformanceController"
import getCourseCompletion_Controller from "./getCourseCompletionController"
import getAllPerformance_Controller from "./getAllPerformanceController"
import getExtendDetails_Controller from "./getExtendDetailsController"
import requestExtention_Controller from "./requestExtentionController"
import getExtendRequest_Controller from "./getExtendRequestController"
import getReviewDetails_Controller from "./getReviewDetailsController"
import secondExtendRequest_Controller from "./secondExtendRequestController"
import governmentIdUpdate_Controller from "./governmentIdUpdateController"
import getAllStudents_Controller from "./getAllStudentsController"
import getPerPageStudent_Controller from "./getPerPageStudentController"
import getAllChatStudents_Controller from "./getAllChatStudentsController"
import addReviewResult_Controller from "./addReviewResultController"
import getReviewStudents_Controller from "./getReviewStudentsController"
export default (dependencies:any)=>{

    return{
        profileUpdateController: profileUpdate_Controller(dependencies),
        getProfileController: getProfile_Controller(dependencies),
        updatePersonalDetailsController: updatePersonalDetails_Controller(dependencies),
        updateAddressDetailsController:updateAddressDetails_Controller(dependencies),
        updateEducationDetailsController:updateEducationDetails_Controller(dependencies),
        getBacthwiseBestStdController:getBacthwiseBestStd_Controller(dependencies),
        getWeeklyPerformanceController:getWeeklyPerformance_Controller(dependencies),
        getCourseCompletionController:getCourseCompletion_Controller(dependencies),
        getAllPerformanceController:getAllPerformance_Controller(dependencies),
        getExtendDetailsController: getExtendDetails_Controller(dependencies),
        requestExtentionController: requestExtention_Controller(dependencies),
        getExtendRequestController: getExtendRequest_Controller(dependencies),
        getReviewDetailsController: getReviewDetails_Controller(dependencies),
        secondExtendRequestController: secondExtendRequest_Controller(dependencies),
        governmentIdUpdateController: governmentIdUpdate_Controller(dependencies),
        getAllStudentsController: getAllStudents_Controller(dependencies),
        getPerPageStudentController: getPerPageStudent_Controller(dependencies),
        getAllChatStudentsController: getAllChatStudents_Controller(dependencies),
        addReviewResultController: addReviewResult_Controller(dependencies),
        getReviewStudentsController: getReviewStudents_Controller(dependencies)
    }
}