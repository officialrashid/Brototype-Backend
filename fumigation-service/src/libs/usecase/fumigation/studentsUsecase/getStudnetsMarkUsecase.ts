// get StudentsMArk Usecase fustion
export const getStudentsMark_Usecase = (dependencies: any) => {
    const {
       repository: { studentRepository }
    } = dependencies;
 
    if (!studentRepository) {
       return console.log("Error: Fumigation Repository not found");
    }
 
    const excutefunction = async (studentId:string,batchId:String,fumigationType:string) => {
        try{
         const response = await studentRepository.getStudentsMark(studentId,batchId,fumigationType); //call the get studentsMark functon define studentRepository
 
         if (response) {
            return { response }; // return success reponse
         }
        } catch(err){
         return {status:false,err:"An Error Occured while get Students Mark Usecase"} // handle exception
        }
      
    };
 
    return {
       excutefunction
    };
 };
 