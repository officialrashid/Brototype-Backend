export class TechnicalWorkout {
    studentId: string;
    batchId: string | undefined;
    weekName: string;
    mainQuestionNumber: string;
    technicalWorkouts: { nestedQuestionNumber: string; answer: string }[];
  
  
    constructor(data: TechnicalWorkout) {
      console.log(data, "data coming to entities");
  
      this.studentId = data.studentId;
      this.batchId = data.batchId;
      this.weekName = data?.weekName;
      this.mainQuestionNumber = data.mainQuestionNumber;
      this.technicalWorkouts = data.technicalWorkouts;
    }
  }
  