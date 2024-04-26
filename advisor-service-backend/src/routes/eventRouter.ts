import  express from "express";
import { eventRepository } from "../repositories/eventRepository";
import { eventInteractor } from "../interactors/eventInteractor";
import { eventController } from "../conrollers/eventController";


const eventRouter=express.Router()

const eventrepository=new eventRepository()
const eventinteractor=new eventInteractor(eventrepository)
const eventcontroller=new eventController(eventinteractor)

eventRouter.get('/all-events',eventcontroller.OngetEvents.bind(eventcontroller))
eventRouter.post('/create-event',eventcontroller.onCreateEvent.bind(eventcontroller))
eventRouter.delete('/event-delete/:id',eventcontroller.OnDeleteEvents.bind(eventcontroller))

export {eventRouter}

