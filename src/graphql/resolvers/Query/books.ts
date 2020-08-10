import BookModel, { Book } from 'src/models/Book'
import { User } from '../../../models/User';
import UserModel from 'src/models/User';
import logger from '@shared/Logger';
import { transformBook } from './merge';


export const booksResolver = async (
  _parent: any,
  _args: any,
  req: any,
): Promise<Promise<Book>[]> => {
  const books: Book[] = await BookModel.find();
  return books.map(book => {
    return transformBook(book);
  });
}