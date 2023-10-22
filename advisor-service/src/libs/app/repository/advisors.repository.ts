import schema from "../dataBase/schema"


export default {

    advisors : async (data:any)=>{
       console.log(data,"data coming to the stundent repositoryyyyyyy");
       
        const advisorData = {
            name : data.name,
            email: data.email
        }
        const response = await schema.advisors.create(advisorData)
        return response;
    }
}