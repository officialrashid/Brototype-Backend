import mongoose from "mongoose";


export const connectDB=async (mongoUri:any)=>{
    try{

       await  mongoose.connect(mongoUri)
       console.log('connected to the mongoDB database');


    }
    catch(error){
        console.log('Error connecting to the mongoDB database:',error);
        process.exit(1)
        

    }
}

