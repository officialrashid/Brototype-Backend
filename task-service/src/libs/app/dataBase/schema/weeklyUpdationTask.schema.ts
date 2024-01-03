import mongoose from "mongoose";

const weeklyTaskUpdationSchema = new mongoose.Schema({
    studentId: String,
    batchId: String,
  
    personalWorkouts: [
        {
            week: String,
            mainQuestionNumber: Number,
            questionNumbersAndAnswers: [
                {
                    nestedQuestionNumber: String,
                    answer: String,
                }
            ]
        }
    ],
    technicalWorkouts: [{}],
    miscellaneousWorkout: [{}],
});

const WeeklyTaskUpdation = mongoose.model("WeeklyTaskUpdation", weeklyTaskUpdationSchema);

export {
    WeeklyTaskUpdation,
};
