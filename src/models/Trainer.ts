import { Schema, model } from 'mongoose';

const TrainerSchema = new Schema({
  username: { type: String },
  password: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  image: { type: String },
  bio: { type: String },
  exercises: [{
    type: Schema.Types.ObjectId,
    ref: 'Exercise'
  }],
  plans: [{
    type: Schema.Types.ObjectId,
    ref: 'Plan'
  }], 
}, {
  timestamps: true
})

export default model('Trainer', TrainerSchema);