import { Schema, model } from 'mongoose';

const ExerciseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  video: { type: String },
  image: { type: String },
  type: { type: String, enum: ['cardio', 'bodybuilding', 'other']}
}, {
  timestamps: true
})

export default model('Exercise', ExerciseSchema);