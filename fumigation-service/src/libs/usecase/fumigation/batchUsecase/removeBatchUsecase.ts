

export const removeBatch_Usecase = (dependencies: any) => {
   const {
      repository: { batchRepository }
   } = dependencies;

   if (!batchRepository) {
      return console.log("Error: Fumigation Repository not found");
   }
   const excutefunction = async (batchId: string) => {
      try {
         const response = await batchRepository.removeBatch(batchId); // call remove batch function
         if (response) {
            return { status: true, response }; // return success response
         }
      } catch(err){
         return{status:false,message: "An Error occurred while removeBatch Usecase"} // handle exception
      }
     
   };

   return {
      excutefunction
   };
};
