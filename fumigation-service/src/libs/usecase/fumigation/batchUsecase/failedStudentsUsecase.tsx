

export const failedStudents_Usecase = (dependencies: any) => {
    const {
       repository: { batchRepository }
    } = dependencies;
 
    if (!batchRepository) {
       return console.log("Error: Fumigation Repository not found");
    }
    const excutefunction = async (batchId:string,fumigationType:string) => {
        console.log("usecaseee keriiiiii");
        
       try{
          const response = await batchRepository.getAllfailedStudents(batchId,fumigationType); // call  getAllBatch function
          if (response) {
             return {status:true,response }; // return response
          }
       } catch(err){
          return {status:false,message : "An Error Occured while get All Batch usecase"} // handle exception
       }
      
    };
 
    return {
       excutefunction
    };
 };
 