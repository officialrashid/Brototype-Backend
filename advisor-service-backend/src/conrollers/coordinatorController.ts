import { Express,Request,Response } from "express"
import { ICoordinatorInteractor } from "../interfaces/ICoordinatorInteractor"
export class  CoordinatorController{
    private coordinatorInteractor:ICoordinatorInteractor

    constructor(coordinatorInteractor:ICoordinatorInteractor){
        this.coordinatorInteractor=coordinatorInteractor
    }


    async OncreateCoordinatorProfile(){
        let coordinatorData:any
        const response=await this.coordinatorInteractor.addCoordnatorProfile(coordinatorData)
        return response
    }

    async OnGetCoordinatorData(req:Request,res:Response){
        let id:string=req.params.id
        const response=await this.coordinatorInteractor.getCoordinatorProfile(id)
        console.log(response);
        
       return  res.json(response)
    }

    async OnGetTopCoordinators(req:Request,res:Response){
        const response= await this.coordinatorInteractor.getTopCoordinators()
        return res.json(response)
        
    }

    async OnEditProfile(req:Request,res:Response){
        console.log(req.body)
        const editCoordinatorData:{emailId:string,profileImageUrl:string,mobileNumber:string,fullName:string}=req.body
        console.log(req.file);
        editCoordinatorData.profileImageUrl=(req.file as any).location 
        const response= await this.coordinatorInteractor.editCoordnatorProfile(editCoordinatorData)
        return res.json(response)
    }

    async OnGetAllCoordinators(){

        const response=await this.coordinatorInteractor.getAllCoordinators()

        const cleanedResponse=response.map((item:any)=>{
            return {_id:item._id.toHexString()}
        })
        return cleanedResponse
        // res.json(response)

    }

}