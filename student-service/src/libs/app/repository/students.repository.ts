import schema from "../dataBase/schema"


export default {

    students : async (data:any)=>{
       console.log(data,"data coming to the stundent repositoryyyyyyy");
       
        const studentData = {
            name : data.name,
            email: data.email
        }
        const response = await schema.students.create(studentData)
        return response;
    }
}