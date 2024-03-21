
import profileUpdate_Controller from "./profileUpdateController"
import getProfile_Controller from "./getProfileController"
import patchProfile_Controller from "./patchProfileController"
import getChatAllSuperleads_Controller from "./getChatAllSuperleadsController"
import updateActivityEvent_Controller from "./updateActivityEventController"
import getActivityEvents_Controller from "./getActivityEventsController"
import getActivityTimeLineup_Controller from "./getActivityTimeLineupController"
import EditActivityEvent_Controller from "./editActivityEventController"
import deleteActivityEvent_Controller from "./deleteActivityEventController"
export default (dependencies:any)=>{

    return{
        profileUpdateController: profileUpdate_Controller(dependencies),
        getProfileController: getProfile_Controller(dependencies),
        patchProfileController: patchProfile_Controller(dependencies),
        getChatAllSuperleadsController: getChatAllSuperleads_Controller(dependencies),
        updateActivityEventController: updateActivityEvent_Controller(dependencies),
        getActivityEventsController: getActivityEvents_Controller(dependencies),
        getActivityTimeLineupController: getActivityTimeLineup_Controller(dependencies),
        EditActivityEventController: EditActivityEvent_Controller(dependencies),
        deleteActivityEventController: deleteActivityEvent_Controller(dependencies),
    }
}