

export const editInvigilator_Usecase = (dependencies: any) => {
   const {
      repository: { invigilatorRepository }
   } = dependencies;

   if (!invigilatorRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async (invigilatorId:string) => {
      try{
         const response = await invigilatorRepository.editInvigilator(invigilatorId);
         if (response) {
            console.log(response);
            
            return {status:true,response };
         }
      } catch(err){
         return{status:false,err:"An error occured while edit invigilator usecase"}
      }
     
   };

   return {
      excutefunction
   };
};
