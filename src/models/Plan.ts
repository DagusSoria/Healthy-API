import { Schema, model } from 'mongoose';

const PlanSchema = new Schema({
  name: { type: String, required: true },
  days: [{
    day: { type: String, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] },
    exercises: [{
      exercise: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
      },
      series: { type: Number },
      weight: { type: Number },
      restSerie: { type: Number },
      restExercise: { type: Number },
      positionInPlan: { type: Number },
      repetitions: { type: Number },
      time: { type: Number },
    }]
  }],
}, { timestamps: true });

export default model('Plan', PlanSchema);