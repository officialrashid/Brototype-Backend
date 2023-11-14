
export const getAllPendingStudents_Usecase = (dependencies: any) => {
   const {
      repository: { studentRepository }
   } = dependencies;

   if (!studentRepository) {
      return console.log("Error: Fumigation Repository not found");
   }

   const excutefunction = async () => {
      try {
         const response = await studentRepository.getAllPendingStudents(); 

         if (response) { // check response coming or not
            console.log(response, "response coming in the "); // return response
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
