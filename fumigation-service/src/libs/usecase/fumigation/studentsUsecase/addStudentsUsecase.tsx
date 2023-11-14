

export const addStudents_Usecase = (dependencies: any) => {
   const {
      repository: { studentRepository }
   } = dependencies;

   if (!studentRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async (studentId:String,batchId:String) => {
       try{
         const response = await studentRepository.addStudents(studentId,batchId);
         if (response) {
            return {response};
         }
       } catch(err){
         return{status:false,message:"An Error occurred addStudents Usecase"}
       }
      
   };

   return {
      excutefunction
   };
};
