// get Batchwise Students USecase
export const getBatchwiseStudents_Usecase = (dependencies: any) => {
   const {
      repository: { studentRepository }
   } = dependencies;

   if (!studentRepository) {
      return console.log("Error: Fumigation Repository not found");
   }

   const excutefunction = async (batchId:String) => { 
    try{
      const response = await studentRepository.getBatchwiseStudents(batchId); // get batchwise Students

      if (response) {
         return { response };
      }
    } catch(err){
      return {status:false,message:"An Error occured while getBatch wise Studnets Usecase"} // handle exception
    }
     
   };

   return {
      excutefunction
   };
};
