import { Document, Schema, model } from 'mongoose';
import { Book, BookCollection } from './Book';
import { User, UserCollection } from './User';

export interface Burrow {
  _id?: string;
  books: Book[];
  user: User;
  created_at: Date;
  updated_at: Date;
}

export type BurrowType = Burrow & Document;

export const BurrowCollection = 'burrows';

export const BurrowSchema = new Schema<Burrow>({
  books: [{ type: Schema.Types.ObjectId, ref: BookCollection ,required: true }],
  user: { type: Schema.Types.ObjectId, ref: UserCollection, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
})

const BurrowModel = model<BurrowType>(BurrowCollection, BurrowSchema);

export default BurrowModel;
