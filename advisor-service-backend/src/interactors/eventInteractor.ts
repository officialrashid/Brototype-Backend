import { eventIntercatorInterface } from "../interfaces/eventInteracorInterface";
import { eventInterface } from "../interfaces/eventInterface";
import { eventRepositoryInterface } from "../interfaces/eventRepositoryInterface";


export class eventInteractor implements eventIntercatorInterface{
    private eventRepository
    constructor(eventRepository:eventRepositoryInterface){
        this.eventRepository=eventRepository
    }

    addEvent(event: eventInterface) {
        return this.eventRepository.addEvent(event)
        
    }

    editevent(event: eventInterface) {
        return this.eventRepository.editEvent('',event)
        
    }

    deleteEvent(coordinatorid: string,eventId:string) {

        return this.eventRepository.deleteEvent(coordinatorid,eventId)
        
    }

    
    

    
}