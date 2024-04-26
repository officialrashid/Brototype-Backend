import express from "express";
import { CoordinatorRepository } from "../repositories/coordinatorRepository";
import { CoordinatorInteractor } from "../interactors/coordinatorInteractor";
import { CoordinatorController } from "../conrollers/coordinatorController";
import {upload} from '../middlewares/s3UploadClient'
import { coordinators } from "../entities/coordinators";
const coordinatorRouter=express.Router()
const repository=new CoordinatorRepository()
const interactor=new CoordinatorInteractor(repository)
const controller=new CoordinatorController(interactor)

coordinatorRouter.post('/profile/edit-coordinators-data/',upload.single('coordinatorProfile'),controller.OnEditProfile.bind(controller))
coordinatorRouter.get('/profile/get-coordinators-data/:id',controller.OnGetCoordinatorData.bind(controller))
coordinatorRouter.get('/profile/top-coordinators',controller.OnGetTopCoordinators.bind(controller))
coordinatorRouter.post('/profile/create-coordinator',async (req,res)=>{
   const response= await coordinators.create(req.body)
   console.log(response);
   res.json(response)
})

// coordinatorRouter.get('/get-all-coordinators/',controller.OnGetAllCoordinators.bind(controller))
export {coordinatorRouter,controller}