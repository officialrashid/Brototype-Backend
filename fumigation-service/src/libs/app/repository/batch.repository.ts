
import schema from "../dataBase/schema"
export default{

    batchNameExist: async (batchName:string)=>{
        try{
           const response= await schema.Batches.find({batchName:batchName})
           console.log(response);
           
           return response
        }catch(error){
          console.log(error,"error in the batchName Exist check function");
          
        }
      },
      createBatch: async (data: any) => {
        try {
          //create a Batch function
          const res = await schema.Batches.find({batchName:data.batchName})
          if(!res){
            
          }
          const batchesData = {
            batchName: data.batchName,
            hubLocation: data.hubLocation,
          }
          const response = await schema.Batches.create(batchesData)
          if (response) {
            const markRecord = {
              batchId: response._id,
    
              mock: [{
                passed: [],
                failed: []
              }],
              final: [{
                passed: [],
                failed: []
              }]
    
            }
            const markCollectionUpdate = await schema.markRecords.create(markRecord)
          }
    
          return response;
        } catch (err) {
          console.log(err, "error in the create batch function");
    
        }
    
      },
      editBatch : async (batchId:string)=>{
        try{
          const response = await schema.Batches.find({_id:batchId})
           console.log(response,"response edite batch");
           if(response.length>0){
            return {status:true,response}
           }else{
            return {status:false,message:"batch not found"}
           }
          
        } catch(error){
          console.log(error,"error in the edit batch repository function");
          
        }
      },
      editBatchSubmit: async (batchId:string,batchName:string)=>{
        try{
            const response = await schema.Batches.updateOne({_id:batchId},{$set:{batchName:batchName}})
            return response;
        }catch(error){
          console.log(error,"error in the editBatchSubmit repository function");
          
        }
    },
    getAllBatches : async ()=>{
      try{
        const response = await schema.Batches.find({},'batchName')
        const modifiedResponse = await response.map(({_id,batchName})=>({_id,batchName}))
        return modifiedResponse
      } catch(err){
        return err;
      }
       
        
     },
     removeBatch : async (batchId:string)=>{
     
        try{
             const response = await schema.Batches.deleteOne({_id:batchId})
             return {status:true,message:"Batch remove successfully"}
        } catch(error){
          console.log(error,"error in the remove batch repository function");
          
        }
      },
      getAllPassedStudents : async (batchId:string,fumigationType:string)=>{
         try {
          const allFumigationStudents: any[] = [];
          const response = (await schema.markRecords.find({ batchId: batchId })) as any;
          console.log(response,"lll batch mark tecord founf");
          
          if (!response || response.length === 0) {
            return { status: false, message: "Batch not found" };
          }
        
          if (fumigationType === "mock") {
            console.log("debuggggg");
            
            const mockPassedStudentsId = response[0]?.mock[0]?.passed || [];
            console.log(mockPassedStudentsId,"passed student idssssss");
            
            const batches = await schema.Batches.find({ _id: batchId });
            console.log(batches,"batchess in passeddd");
            
            if (mockPassedStudentsId.length > 0 && batches.length > 0) {
              console.log("next stepppppp");
              
              // Loop through the passed students in mock
              mockPassedStudentsId.forEach((studentId: string | undefined) => {
                // Loop through batches and fumigation students
                batches[0].fumigationStudents.forEach((student:any) => {
                  console.log(student,"full student");
                  
                  console.log(student.studentId,"batch idd std");
                  console.log(studentId,"student idssss idd std");
                  const convertStudnetId:any = student.studentId.toString()
                  if (convertStudnetId === studentId) {
                    console.log("uliil next stepp");
                    
                    allFumigationStudents.push({
                      studentId: student.studentId,
                      name: student.name,
                      email: student.email,
                      phone: student.phone,
                      qualification: student.qualification,
                      // Add other details as needed
                    });
                  }
                });
              });
              console.log(allFumigationStudents,"Llllllllllllll");
              
              return { status: true, mockPassedStudents: allFumigationStudents };
            } else {
              return { status: false, message: "No passed students in mock or batch not found" };
            }
          } else {
            const finalPassedStudentsId = response[0]?.final[0]?.passed || [];
           const batches = await schema.Batches.find({ _id: batchId });
           if (finalPassedStudentsId.length > 0 && batches.length > 0) {
             // Loop through the passed students in mock
             finalPassedStudentsId.forEach((studentId: string | undefined) => {
               // Loop through batches and fumigation students
               batches[0].fumigationStudents.forEach((student:any) => {
                const convertStudnetId:any = student.studentId.toString()
                 if (convertStudnetId === studentId) {
                   allFumigationStudents.push({
                     studentId: student.studentId,
                     name: student.name,
                     email: student.email,
                     phone: student.phone,
                     qualification: student.qualification,
                     // Add other details as needed
                   });
                 }
               });
             });
             console.log(allFumigationStudents,"dfshbshj");
             
             return { status: true, finalPassedStudents: allFumigationStudents };
           } else {
             return { status: false, message: "No passed students in mock or batch not found" };
           }
   
          }
        } catch (err) {
          return { status: false, message: "Internal Server Error" };
        }
        
      },
      getAllfailedStudents : async (batchId:string,fumigationType:string)=>{
         try {
          const allFumigationStudents: any[] = [];
          const response = (await schema.markRecords.find({ batchId: batchId })) as any;
        
          if (!response || response.length === 0) {
            return { status: false, message: "Batch not found" };
          }
        
          if (fumigationType === "mock") {
            const mockPassedStudentsId = response[0]?.mock[0]?.failed || [];
            const batches = await schema.Batches.find({ _id: batchId });
            if (mockPassedStudentsId.length > 0 && batches.length > 0) {
              // Loop through the passed students in mock
              mockPassedStudentsId.forEach((studentId: string | undefined) => {
                // Loop through batches and fumigation students
                batches[0].fumigationStudents.forEach((student:any) => {
                  const convertStudnetId:any = student.studentId.toString()
                  if (convertStudnetId === studentId) {
                    allFumigationStudents.push({
                      studentId: student.studentId,
                      name: student.name,
                      email: student.email,
                      phone: student.phone,
                      qualification: student.qualification,
                      // Add other details as needed
                    });
                  }
                });
              });
              return { status: true, mockFailedStudents: allFumigationStudents };
            } else {
              return { status: false, message: "No failed students in mock or batch not found" };
            }
          } else {
            const finalPassedStudentsId = response[0]?.final[0]?.failed || [];
           const batches = await schema.Batches.find({ _id: batchId });
           if (finalPassedStudentsId.length > 0 && batches.length > 0) {
             // Loop through the passed students in mock
             finalPassedStudentsId.forEach((studentId: string | undefined) => {
               // Loop through batches and fumigation students
               batches[0].fumigationStudents.forEach((student:any) => {
                const convertStudnetId:any = student.studentId.toString()
                 if (convertStudnetId === studentId) {
                   allFumigationStudents.push({
                     studentId: student.studentId,
                     name: student.name,
                     email: student.email,
                     phone: student.phone,
                     qualification: student.qualification,
                     // Add other details as needed
                   });
                 }
               });
             });

             return { status: true, finalFailedStudents: allFumigationStudents };
           } else {
             return { status: false, message: "No failed students in final or batch not found" };
           }
   
          }
         } catch(err){
          return{status:false,message:"Error in the get All failed Students"}
         }
      }
}
