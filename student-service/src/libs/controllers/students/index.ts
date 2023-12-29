
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
        getReviewDetailsController: getReviewDetails_Controller(dependencies)
    }
}