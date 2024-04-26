import express from "express"
import { sendAdvisorData } from "../external-libraries/kafkaService"
import { returnToken } from "../app"
import { consumeMeetData } from "../external-libraries/reviewConsumer"



const meetRouter=express.Router()

export let meetLink=''
meetRouter.get('/create-meet/:id',async (req,res)=>{
    let meetLink=''
    console.log('backkk');

    
    let message={type:'create-meeting-link',value:req.params.id}
    sendAdvisorData('create-meet',message)

  const meetLinkData:any=await consumeMeetData()
   
   console.log(meetLinkData,'promiseeeeeee');
   res.json({token:meetLinkData.value})
   
})

export {meetRouter}