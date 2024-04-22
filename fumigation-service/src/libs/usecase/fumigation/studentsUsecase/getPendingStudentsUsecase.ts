// get Batchwise Students USecase
export const getPendingStudents_Usecase = (dependencies: any) => {
    const {
       repository: { studentRepository }
    } = dependencies;
 
    if (!studentRepository) {
       return console.log("Error: Fumigation Repository not found");
    }
 
    const excutefunction = async (uniqueId:String) => { 
     try{
       const response = await studentRepository.getPendingStudents(uniqueId); // get batchwise Students
       if (response.status===true) {
          return { response };
       }else{
        return { response }
       }
     } catch(err){
       return {status:false,message:"An Error occured while getBatch wise Studnets Usecase"} // handle exception
     }
      
    };
 
    return {
       excutefunction
    };
 };
 