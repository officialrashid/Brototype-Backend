export class TechnicalWorkout {
    studentId: string;
    batchId: string | undefined;
    weekName: string;
    mainQuestionNumber: string;
    mainQuestion:String
    technicalWorkouts: { nestedQuestionNumber: string; answer: string;nestedQuestion:string }[];
  
  
    constructor(data: TechnicalWorkout) {
      console.log(data, "data coming to entities");
  
      this.studentId = data.studentId;
      this.batchId = data.batchId;
      this.weekName = data?.weekName;
      this.mainQuestionNumber = data.mainQuestionNumber;
      this.technicalWorkouts = data.technicalWorkouts;
      this.mainQuestion = data.mainQuestion;
    }
  }
  