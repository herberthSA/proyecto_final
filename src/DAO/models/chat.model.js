//@ts-check
import { Schema, model } from 'mongoose';

const schema = new Schema({
  user: { type: String },
  message: { type: String },
});

export const MsgModel = model('messages', schema);