import express from 'express'
import { eventController } from '../conrollers/eventController'
import { eventInteractor } from '../interactors/eventInteractor'
import { eventRepository } from '../repositories/eventRepository'


const router=express.Router()
const repository=new eventRepository()
const interactor=new eventInteractor(repository)
const controller= new eventController(interactor)

router.post('/add-event',controller.onCreateEvent.bind(controller))
router.post('/edit-profile',)

export default router