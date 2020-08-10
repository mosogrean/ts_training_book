import BookModel, { Book } from 'src/models/Book'
import { User } from '../../../models/User';
import UserModel from 'src/models/User';
import logger from '@shared/Logger';


export const booksResolver = async (
  _parent: any,
  _args: any,
  req: any,
): Promise<Book[]> => {
  const books: Book[] = await BookModel.find();
  return books;
}