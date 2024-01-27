import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const NestedQuestionSchema = new mongoose.Schema({
  Number: { type: Number, required: true },
  Question: { type: String, required: true },
  mainQuestionNumber: { type: Number, required: true },
});

const PersonalWorkoutSchema = new mongoose.Schema({
  Number: { type: Number, required: true },
  question: { type: String, required: true },
});

const PersonalWorkoutsSchema = new mongoose.Schema({
  technicalLeadId: { type: ObjectId, required: true },
  week: { type: String, required: true },
  personalWorkouts: [PersonalWorkoutSchema],
  personalWorkoutNestedQuestions: [NestedQuestionSchema],
});

export const PersonalWorkouts = mongoose.model('PersonalWorkouts', PersonalWorkoutsSchema);
