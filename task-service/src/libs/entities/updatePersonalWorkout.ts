export class PersonalWorkout {
  studentId: string;
  batchId: string | undefined;
  weekName: string;
  mainQuestionNumber: string;
  mainQuestion:String
  personalWorkouts: { nestedQuestionNumber: string; answer: string; nestedQuestion:string }[];


  constructor(data: PersonalWorkout) {
    console.log(data, "data coming to entities");

    this.studentId = data.studentId;
    this.batchId = data.batchId;
    this.weekName = data?.weekName;
    this.mainQuestionNumber = data.mainQuestionNumber;
    this.personalWorkouts = data.personalWorkouts;
    this.mainQuestion = data.mainQuestion;
  }
}
