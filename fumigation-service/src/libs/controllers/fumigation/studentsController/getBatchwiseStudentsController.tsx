
import { Request, Response } from "express";

// get batch wise students controller
export default (dependencies: any) => {

    const {
        useCase: { getBatchwiseStudents_Usecase }
    } = dependencies
    const getBatchwiseStudentsController = async (req: Request, res: Response) => {
        console.log("{}{}{}{))(***********");
        
        try {
            console.log(req.params,"paramss loginggg");
            
            const {batchId} = req.params // destructuring data
            console.log(batchId,"id comingsssss 5555%%%%%%");
            
            const response = await getBatchwiseStudents_Usecase(dependencies).excutefunction(batchId)// pass the data excutefunction define in students usecase
            res.status(201).json(response)
        } catch(err){
            res.status(500).json({err:"Internal Servre Error"}) // handle exception
        }
    
    
 }
    return getBatchwiseStudentsController;
}
