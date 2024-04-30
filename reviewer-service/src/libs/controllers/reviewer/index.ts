import scheduleTime_Controller from "./scheduleTimeController";
import getScheduleEvents_Controller from "./getScheduleEventsController";
import updateScheduleEvents_Controller from "./updateScheduleEventsController";
import deleteScheduleEvents_Controller from "./deleteScheduleEventsController";
import getDayTimeLineup_Controller from "./getDayTimeLineupController";
import getAllDetails_Controller from "./getAllDetailsController";
import profileUpdate_Controller from "./profileUpdateController";
import updateWorkDetails_Controller from "./updateWorkDetailsController";
import getReviewerProfile_Controller from "./getReviewerProfileController";
import reviewTakeCount_Controller from "./reviewTakeCountController";
import getAllReviewersProfile_Controller from "./getAllReviewersProfileController";
import getBestReviewers_Controller from "./getBestReviewersController";
import getReviewCountAnalyze_Controller from "./getReviewCountAnalyzeController";
import getPerPageReviewers_Controller from "./getPerPageReviewersController";
import getAllChatReviewers_Controller from "./getAllChatReviewersController";
import getParticularEvents_Controller from "./getParticularEventsController";
import updateParticularEvents_Controller from "./updateParticularEventsController";
import cancelParticularEvents_Controller from "./cancelParticularEventsController";
import getDomainWiseReviewers_Controller from "./getDomainWiseReviewersController";
import updateReviewCompleted_Controller from "./updateReviewCompletedController";
import getReviewes_Controller from "./getReviewesController";
export default (dependencies:any)=>{
    return{
        scheduleTimeController: scheduleTime_Controller(dependencies),
        getScheduleEventsController: getScheduleEvents_Controller(dependencies),
        updateScheduleEventsController: updateScheduleEvents_Controller(dependencies),
        deleteScheduleEventsController: deleteScheduleEvents_Controller(dependencies),
        getDayTimeLineupController: getDayTimeLineup_Controller(dependencies),
        getAllDetailsController: getAllDetails_Controller(dependencies),
        profileUpdateController: profileUpdate_Controller(dependencies),
        updateWorkDetailsController: updateWorkDetails_Controller(dependencies),
        getReviewerProfileController: getReviewerProfile_Controller(dependencies),
        reviewTakeCountController: reviewTakeCount_Controller(dependencies),
        getAllReviewersProfileController: getAllReviewersProfile_Controller(dependencies),
        getBestReviewersController: getBestReviewers_Controller(dependencies),
        getReviewCountAnalyzeController: getReviewCountAnalyze_Controller(dependencies),
        getPerPageReviewersController: getPerPageReviewers_Controller(dependencies),
        getAllChatReviewersController: getAllChatReviewers_Controller(dependencies),
        getParticularEventsController: getParticularEvents_Controller(dependencies),
        updateParticularEventsController: updateParticularEvents_Controller(dependencies),
        cancelParticularEventsController: cancelParticularEvents_Controller(dependencies),
        getDomainWiseReviewersController: getDomainWiseReviewers_Controller(dependencies),
        updateReviewCompletedController: updateReviewCompleted_Controller(dependencies),
        getReviewesController: getReviewes_Controller(dependencies),
    }
}
