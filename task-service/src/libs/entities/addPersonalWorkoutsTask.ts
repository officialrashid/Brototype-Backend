export class addPersonalWorkoutTask {
    technicalLeadId: string;
    week: string;// Assuming this property is present in your data
    personalWorkouts: {
      Number: number;
      Question: string;
    }[];
    personalWorkoutNestedQuestions: {
      Number: string;
      Question: string;
      mainQuestionNumber:number
    }[];
  
    constructor(data: addPersonalWorkoutTask) {
      console.log(data, "data coming to entities");
  
      this.technicalLeadId = data.technicalLeadId;
      this.week = data?.week;
      this.personalWorkouts = data.personalWorkouts || [];
      this.personalWorkoutNestedQuestions = data.personalWorkoutNestedQuestions || [];
    }
  }
  