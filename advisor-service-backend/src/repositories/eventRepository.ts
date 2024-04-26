



import { coordinators } from "../entities/coordinators";
import { eventInterface } from "../interfaces/eventInterface";
import { eventRepositoryInterface } from "../interfaces/eventRepositoryInterface";


export class eventRepository implements eventRepositoryInterface{
    async addEvent(event: eventInterface) {
        console.log('hello',event);  
        const response= await coordinators.findByIdAndUpdate('66199c84e5ef257629c45d69',{$push:{events:event}},  { new: true})

           return response
    }

    async editEvent(coordinatorId:string,event:any){
        const coordinatorData= await coordinators.findById('66199c84e5ef257629c45d69')
        let eventData= coordinatorData?.events
        let index:number|undefined
        console.log(eventData,'vss');
        
            index= eventData?.findIndex(obj=>(obj as any)._id ==event.id)
            console.log(index,'indee');
            
            if(eventData&&index!==undefined){
                
                if(index!==-1){
                    console.log('helooooooo');
                    
                    eventData[index]=event
                  const res=  await coordinatorData?.save()
                  console.log(res,'edittttt');
                  return res
                  
                  

                }
            }  
            
           
        }
       

      

        async deleteEvent(coordinatorId:string,eventId:string){

            const coordinatorData= await coordinators.findById('66199c84e5ef257629c45d69')
            let eventData= coordinatorData?.events
            let index:number|undefined
            index= eventData?.findIndex(obj=>(obj as any)._id===eventId)
if(index!==undefined){
    eventData?.splice(index,1)

}
            
          const res=await coordinatorData?.save()
          return res
        }

    

}

// [
//     {
//       '$match': {
//         'coordinatorId': new ObjectId('612345678901234567890001')
//       }
//     }, {
//       '$unwind': {
//         'path': '$reviews'
//       }
//     }, {
//       '$match': {
//         'reviews.reviewStatus': 'notcompleted'
//       }
//     }, {
//       '$project': {
//         'year': {
//           '$year': '$createdAt'
//         }, 
//         'month': {
//           '$dateToString': {
//             'format': '%Y-%m', 
//             'date': '$createdAt'
//           }
//         }
//       }
//     }, {
//       '$group': {
//         '_id': {
//           'year': '$year', 
//           'month': '$month'
//         }, 
//         'reviewCount': {
//           '$sum': 1
//         }
//       }
//     }, {
//       '$project': {
//         'month': {
//           '$concat': [
//             {
//               '$substrCP': [
//                 '$_id.year', 2, 3
//               ]
//             }, '-', {
//               '$substrCP': [
//                 '$_id.month', 5, 6
//               ]
//             }
//           ]
//         }, 
//         '_id': 0, 
//         'reviewCount': 1
//       }
//     }, {
//       '$sort': {
//         'month': 1
//       }
//     }
//   ]



// [
//     {
//       '$match': {
//         'coordinatorId': new ObjectId('612345678901234567890001')
//       }
//     }, {
//       '$unwind': {
//         'path': '$reviews'
//       }
//     }, {
//       '$match': {
//         'reviews.reviewStatus': 'notcompleted'
//       }
//     }, {
//       '$project': {
//         'year': {
//           '$year': '$createdAt'
//         }, 
//         'month': {
//           '$dateToString': {
//             'format': '%Y-%m', 
//             'date': '$createdAt'
//           }
//         }
//       }
//     }, {
//       '$group': {
//         '_id': {
//           'year': '$year', 
//           'month': '$month'
//         }, 
//         'reviewCount': {
//           '$sum': 1
//         }
//       }
//     }, {
//       '$project': {
//         'month': {
//           '$concat': [
//             {
//               '$substrCP': [
//                 '$_id.year', 2, 3
//               ]
//             }, '-', {
//               '$switch': {
//                 'branches': [
//                   {
//                     'case': {
//                       '$eq': [
//                         {
//                           '$substr': [
//                             '$_id.month', 5, 2
//                           ]
//                         }, '04'
//                       ]
//                     }, 
//                     'then': 'Jan'
//                   }
//                 ], 
//                 'default': ''
//               }
//             }
//           ]
//         }, 
//         '_id': 0, 
//         'reviewCount': 1
//       }
//     }, {
//       '$sort': {
//         'month': 1
//       }
//     }
//   ]