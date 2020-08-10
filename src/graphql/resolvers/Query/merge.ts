import UserModel, { User } from '../../../models/User';
import { Book } from '../../../models/Book';
import BookModel from 'src/models/Book';


const user = async (
  userId: User,
): Promise<User> => {
  try {
    // tslint:disable-next-line: no-shadowed-variable
    const user: any = await UserModel.findById(userId);
    return {
      ...user._doc,
    }
  } catch (e) {
    throw e;
  }
}

const users = async (
  userIds: User[],
): Promise<Promise<User>[]> => {
  try {
    // tslint:disable-next-line: no-shadowed-variable
    const users = await UserModel.find({_id: {$in: userIds}});
    return users.map(user => {
      return transformUser(user);
    })
  } catch (e) {
    throw e;
  }
}

const books = async (
  bookIds: Book[],
): Promise<Promise<Book>[]> => {
  try {
    // tslint:disable-next-line: no-shadowed-variable
    const books = await BookModel.find({_id: {$in: bookIds}});
    return books.map(book => {
      return transformBook(book);
    })
  } catch (e) {
    throw e;
  }
}

export const transformUser = async (user: any): Promise<User> => {
  return {
    ...user._doc
    // _id: user._id,
    // name: user.name,
    // email: user.email,
    // role: user.role,
    // created_at: user.created_at,
    // updated_at: user.updated_at
  }
}

export const transformBook = async (book: any): Promise<Book> => {
  return {
    ...book._doc,
    // _id: book._id,
    // title: book.title,
    author: user(book.author),
    // type: book.type,
    // status: book.status,
    // created_at: book.created_at,
    // updated_at: book.updated_at,
  }
}