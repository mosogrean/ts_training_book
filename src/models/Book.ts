import { Document, Schema, model } from 'mongoose';
import { User, UserCollection } from './User';

export interface Book {
  _id?: string;
  title: string;
  author: User;
  type: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export type BookType = Book & Document;

export const BookCollection = 'books';

export const BookSchema = new Schema<Book>({
  title: { type: String, unique: true, required: true },
  author: { type: Schema.Types.ObjectId, ref: UserCollection ,required: true },
  type: { type: String, required: true },
  status: { type: String, enum: ['avaliable', 'burrow'], default: 'avaliable', required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
})

const BookModel = model<BookType>(BookCollection, BookSchema);

export default BookModel;
