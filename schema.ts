import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {type: String, required: true, uniq: true},
    password: {type: String, required: true},
    animalname: {type: String, required: true, index: true}
  }
);

export type User = mongoose.InferSchemaType<typeof userSchema>;
export const User = mongoose.model('User', userSchema);
// Room
// Chat
