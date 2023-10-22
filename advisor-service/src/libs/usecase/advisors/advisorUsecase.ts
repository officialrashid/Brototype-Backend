


export const advisor_Usecase = (dependencies:any)=>{

  const {
    repository :{advisorRepository}
  } = dependencies;
     if(!advisorRepository){
        return console.log("error not found stuentRepository");
        
     }
     const excutefunction =async (data:any)=>{
        const response = await advisorRepository.advisors(data)
        if(response){
            console.log(response,"response coming in the usecaseeeee");
            return{status:true,response}
        }
     }
     return{
        excutefunction
     }
}