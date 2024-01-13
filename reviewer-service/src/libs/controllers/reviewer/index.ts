import scheduleTime_Controller from "./scheduleTimeController"
import getScheduleEvents_Controller from "./getScheduleEventsController"
import updateScheduleEvents_Controller from "./updateScheduleEventsController"
import deleteScheduleEvents_Controller from "./deleteScheduleEventsController"
import getDayTimeLineup_Controller from "./getDayTimeLineupController"
import getAllDetails_Controller from "./getAllDetailsController"
import profileUpdate_Controller from "./profileUpdateController"
import updateWorkDetails_Controller from "./updateWorkDetailsController";
import getReviewerProfile_Controller from "./getReviewerProfileController"
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
    }
}
