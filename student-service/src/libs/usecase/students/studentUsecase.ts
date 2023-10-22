


export const student_Usecase = (dependencies:any)=>{

  const {
    repository :{studentRepository}
  } = dependencies;
     if(!studentRepository){
        return console.log("error not found stuentRepository");
        
     }
     const excutefunction =async (data:any)=>{
        const response = await studentRepository.students(data)
        if(response){
            console.log(response,"response coming in the usecaseeeee");
            return{status:true,response}
        }
     }
     return{
        excutefunction
     }
}