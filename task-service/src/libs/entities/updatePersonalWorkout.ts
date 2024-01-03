export class PersonalWorkout {
  studentId: string;
  batchId: string | undefined;
  weekName: string;
  mainQuestionNumber: string;
  personalWorkouts: { nestedQuestionNumber: string; answer: string }[];


  constructor(data: PersonalWorkout) {
    console.log(data, "data coming to entities");

    this.studentId = data.studentId;
    this.batchId = data.batchId;
    this.weekName = data?.weekName;
    this.mainQuestionNumber = data.mainQuestionNumber;
    this.personalWorkouts = data.personalWorkouts;
  }
}
