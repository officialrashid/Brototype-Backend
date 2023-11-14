
// remove invigilator Usecase
export const removeInvigilator_Usecase = (dependencies: any) => {
   const {
      repository: { invigilatorRepository }
   } = dependencies;

   if (!invigilatorRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async (invigilatorId:string) => {
      const response = await invigilatorRepository.removeInvigilator(invigilatorId);
      try{
         if (response) {
            return {status:true,message:"invigilator remove successfully" };
         }
      } catch(err){
         return {status:false,err:"An error occurred while remove Invigilator Usecase"}
      }
     
   };

   return {
      excutefunction
   };
};
