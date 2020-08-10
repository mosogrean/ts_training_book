import { Document, Schema, model } from 'mongoose';
import { Book, BookCollection } from './Book';

export interface User {
  _id?: string;
  name: string;
  email: string;
  role: number;
  books: Book[];
  created_at: Date;
  updated_at: Date;

  _doc?: User | undefined;
}

export const UserCollection = 'users';

export type UserType = User & Document;

export const UserSchema = new Schema<User>({
  name: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  role: { type: Number, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'books' ,required: true }],
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
})

const UserModel = model<UserType>(UserCollection, UserSchema);

export default UserModel;
