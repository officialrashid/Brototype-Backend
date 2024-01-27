export class addMiscellaneousWorkoutTask {
    technicalLeadId: string;
    week: string;// Assuming this property is present in your data
    miscellaneousWorkouts: {
      Number: number;
      Question: string;
    }[];
    miscellaneousWorkoutNestedQuestions: {
      Number: string;
      Question: string;
      mainQuestionNumber:number
    }[];
  
    constructor(data: addMiscellaneousWorkoutTask) {
      console.log(data, "data coming to entities");
      this.technicalLeadId = data.technicalLeadId;
      this.week = data?.week;
      this.miscellaneousWorkouts = data.miscellaneousWorkouts || [];
      this.miscellaneousWorkoutNestedQuestions = data.miscellaneousWorkoutNestedQuestions || [];
    }
  }
  