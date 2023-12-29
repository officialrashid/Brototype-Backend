
import scheduleTime_Controller from "./scheduleTimeController"
import getScheduleEvents_Controller from "./getScheduleEventsController"
import updateScheduleEvents_Controller from "./updateScheduleEventsController"
import deleteScheduleEvents_Controller from "./deleteScheduleEventsController"
import getDayTimeLineup_Controller from "./getDayTimeLineupController"
import getAllDetails_Controller from "./getAllDetailsController"
export default (dependencies:any)=>{

    return{
        scheduleTimeController: scheduleTime_Controller(dependencies),
        getScheduleEventsController: getScheduleEvents_Controller(dependencies),
        updateScheduleEventsController: updateScheduleEvents_Controller(dependencies),
        deleteScheduleEventsController: deleteScheduleEvents_Controller(dependencies),
        getDayTimeLineupController: getDayTimeLineup_Controller(dependencies),
        getAllDetailsController: getAllDetails_Controller(dependencies),
    }
}