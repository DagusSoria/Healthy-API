import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  plans: [{
    type: Schema.Types.ObjectId,
    ref: 'Plan'
  }], 
}, { timestamps: true })

export default model('User', UserSchema)