import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const NestedQuestionSchema = new mongoose.Schema({
  Number: { type: Number, required: true },
  Question: { type: String, required: true },
  mainQuestionNumber: { type: Number, required: true },
});

const TechnicalWorkoutSchema = new mongoose.Schema({
  Number: { type: Number, required: true },
  question: { type: String, required: true },
});

const TechnicalWorkoutsSchema = new mongoose.Schema({
  technicalLeadId: { type: ObjectId, required: true },
  week: { type: String, required: true },
  domain: { type: String, required: true },
  technicalWorkouts: [TechnicalWorkoutSchema],
  technicalWorkoutNestedQuestions: [NestedQuestionSchema],
});

export const TechnicalWorkouts = mongoose.model('TechnicalWorkouts', TechnicalWorkoutsSchema);
