export class MiscellaneousWorkout {
    studentId: string;
    batchId: string | undefined;
    weekName: string;
    mainQuestionNumber: string;
    mainQuestion:String
    miscellaneousWorkouts: { nestedQuestionNumber: string; answer: string;nestedQuestion:string  }[];
  
  
    constructor(data: MiscellaneousWorkout) {
      console.log(data, "data coming to entities");
  
      this.studentId = data.studentId;
      this.batchId = data.batchId;
      this.weekName = data?.weekName;
      this.mainQuestionNumber = data.mainQuestionNumber;
      this.miscellaneousWorkouts = data.miscellaneousWorkouts;
      this.mainQuestion = data.mainQuestion;
    }
  }
  