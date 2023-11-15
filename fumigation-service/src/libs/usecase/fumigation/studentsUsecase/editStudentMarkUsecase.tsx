

export const editStudentMark_Usecase = (dependencies: any) => {
    const {
       repository: { studentRepository }
    } = dependencies;
 
    if (!studentRepository) {
       return console.log("Error: Fumigation Repository not found");
    }
    const excutefunction = async (studentId:string,batchId:string,fumigationType:string) => {
       try{
          const response = await studentRepository.editStudentMark(studentId,batchId,fumigationType); // edit batch 
          if (response) {
             return {response }; // return success respinse
          }
       } catch(err){
          return{status:false, message : "An error occured while editBatch usecase"} // handle exception
       }
       }
      
 
    return {
       excutefunction
    };
 };
 