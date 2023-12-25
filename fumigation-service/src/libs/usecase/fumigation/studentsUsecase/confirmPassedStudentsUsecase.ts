

export const confirmPassedStudents_Usecase = (dependencies: any) => {
    const {
       repository: { studentRepository }
    } = dependencies;
 
    if (!studentRepository) {
       return console.log("Error: Fumigation Repository not found");
    }
    const excutefunction = async (batchId:string,fumigationType:string) => {
       try{
          const response = await studentRepository.getPassedStudentsDetails(batchId,fumigationType); // edit batch 
          if (response) {
            console.log(response,"response in get passed students usecase coming");
            const sendDataAuthServ = await studentRepository.sendAllDataToAuth(response?.passedStudentsDetails)
            //  return {response }; // return success respinse
          }
       } catch(err){
          return{status:false, message : "An error occured while editBatch usecase"} // handle exception
       }
       }
      
 
    return {
       excutefunction
    };
 };
 