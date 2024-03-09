
export const getPerPageStudent_Usecase = (dependencies: any) => {
    const {
       repository: { studentRepository }
    } = dependencies;
 
    if (!studentRepository) {
       return console.log("Error: Fumigation Repository not found");
    }
 
    const excutefunction = async (hubLocation:string,perPage:number) => {
       try {
          const response = await studentRepository.getPerPageStudents(hubLocation,perPage); 
          if (!response) { // check response coming ors not
           return {status:false,message:"fumigation students not found"}
          }else{
            return { response };
          }
       } catch(err){
          return {status:false,message:"An Error occured get All pending students"} // handle exception
       }
       
    };
 
    return {
       excutefunction
    };
 };
 