export class addTechnicalWorkoutTask {
    technicalLeadId: string;
    domain:string
    week: string;// Assuming this property is present in your data
    technicalWorkouts: {
      Number: number;
      Question: string;
    }[];
    technicalWorkoutNestedQuestions: {
      Number: string;
      Question: string;
      mainQuestionNumber:number
    }[];
  
    constructor(data: addTechnicalWorkoutTask) {
      console.log(data, "data coming to entities");
      this.technicalLeadId = data.technicalLeadId;
      this.domain = data.domain
      this.week = data?.week;
      this.technicalWorkouts = data.technicalWorkouts || [];
      this.technicalWorkoutNestedQuestions = data.technicalWorkoutNestedQuestions || [];
    }
  }
  