import express,{Request,Response,Application} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/dbConnection'
import  router  from './routes/router'
import bodyParser from 'body-parser'
import { consumeReviewData,consumeMeetData } from './external-libraries/reviewConsumer'
import { coordinatorRouter } from './routes/coordinatorRouter'
import { eventRouter } from './routes/eventRouter'
import {meetRouter} from './routes/meetRouter'
dotenv.config()

const app:Application=express()

const port:string|undefined=process.env.PORT
const mongoUri:string|undefined=process.env.MONGO_URI
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true // Make sure to enable credentials
}
app.use(cors(corsOptions))
app.use(bodyParser.json())


app.use('/coordinators',coordinatorRouter)
//app.use('/coordinators',router)
app.use('/coordinators/event',eventRouter)
app.use('/coordinators/meet',meetRouter)
  app.listen(port,()=>{
    console.log(`Server is Fire at http://localhost:${port}`);
    
  })

 export const returnToken=(token:string) => token
consumeReviewData()
//consumeMeetData()
connectDB(mongoUri)

 