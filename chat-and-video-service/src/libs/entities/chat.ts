// entities/enquiries.ts

export class Chat {
  initiatorId : string;
  recipientId: string;

  constructor(initiatorId:string,recipientId:string) {
    console.log(initiatorId,"data coming to entitites",recipientId);
    
    this.initiatorId = initiatorId,
    this.recipientId = recipientId
  }
}

interface ChatData {
  initiatorId : string;
  recipientId: string;

}
