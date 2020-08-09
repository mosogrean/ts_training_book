import { Document, Schema, model } from 'mongoose';

export interface User {
  _id?: string;
  name: string;
  email: string;
  role: number;
  created_at: Date;
  updated_at: Date;
}

export const UserCollection = 'users';

export type UserType = User & Document;

export const UserSchema = new Schema<User>({
  name: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  role: { type: Number, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
})

const UserModel = model<UserType>(UserCollection, UserSchema);

export default UserModel;
