import { eventInterface } from "./eventInterface";


export interface eventIntercatorInterface{

    addEvent(event:eventInterface):any
    editevent(event:eventInterface):any
    deleteEvent(coordinatorId:string,eventId:string):any
 

}