

export const editBatch_Usecase = (dependencies: any) => {
   const {
      repository: { batchRepository }
   } = dependencies;

   if (!batchRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async (batchId:string) => {
      try{
         const response = await batchRepository.editBatch(batchId); // edit batch 
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
