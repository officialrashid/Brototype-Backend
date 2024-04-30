import express from "express"
import { sendAdvisorData } from "../external-libraries/kafkaService"
import { returnToken } from "../app"
import { consumeMeetData } from "../external-libraries/reviewConsumer"
// import { MeetController } from "../conrollers/meetController"
// const meetController=new MeetController()


const meetRouter=express.Router()

export let meetLink=''
// meetRouter.get('/create-meet/:id',async (req,res)=>{
//     let meetLink=''
//     console.log('backkkfsff');

    
//     let message={type:'create-meeting-link',value:req.params.id}
//     sendAdvisorData('create-meet',message)
//       console.log('hellloo');
      
//   const meetLinkData:any=await consumeMeetData()
   
//    console.log(meetLinkData,'promiseeeeeee');
//    res.json({token:meetLinkData.value})
   
// })
// meetRouter.get('/create-meet/:id',meetController.OnCreateMeet.bind(meetController))

export {meetRouter}