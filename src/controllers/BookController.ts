import { Request, Response } from 'express';
import { Book, BookType } from '../models/Book';
import BookModel from '../models/Book';
import { OK, NOT_FOUND, BAD_REQUEST, NO_CONTENT } from 'http-status-codes';
import logger from '@shared/Logger';
import UserModel from 'src/models/User';


export class BookController {

  public all = async (req: Request, res: Response) => {
    const books: Book[] = await BookModel.find();
    res.status(OK).json(books);
  }

  public show = async (req: Request, res: Response) => {
    const { book_id } = req.params;
    try {
      const book: Book | null = await BookModel.findOne({_id: book_id});
      if (book == null) {
        res.status(NOT_FOUND).json({message: 'book not found'});
      }
      res.status(OK).json(book);
    } catch (e) {
      logger.error(JSON.stringify(e));
      res.status(BAD_REQUEST).json(e);
    }
  }

  public store = async (req: Request, res: Response) => {
    const { title, author, type } = req.body;
    const book: Book = {
      title,
      author,
      type,
      status: 'avaliable',
      created_at: new Date(),
      updated_at: new Date(),
    }
    try {
      const user = await UserModel.findById(book.author);
      if (user != null) {
        book.author = user;
        const bookStored = await BookModel.create(book)
        user.books = [...user.books, bookStored];
        await user.save();

        res.status(OK).json(bookStored);
      } else {
        res.status(NOT_FOUND).json({message: 'user not found'});
      }
    } catch (e) {
      logger.error(JSON.stringify(e));
      res.status(BAD_REQUEST).json(e);
    }
  }

  public update = async (req: Request, res: Response) => {
    const { book_id } = req.params;
    const { title, author, type } = req.body;

    try {
      const book: BookType | null = await BookModel.findById(book_id);
      if (book != null) {
        book.title = title;
        book.author = author;
        book.type = type;
        await book.save();
        res.status(OK).json(book);
      }
      res.status(NOT_FOUND).json({message: 'book not found'});
    } catch (e) {
      logger.error(JSON.stringify(e));
      res.status(BAD_REQUEST).json(e);
    }
  }

  public delete = async (req: Request, res: Response) => {
    const { book_id } = req.params;

    try {
      const book: BookType | null = await BookModel.findById(book_id);
      if (book != null) {
        await book.remove();
        res.status(NO_CONTENT).json();
      }
      res.status(NOT_FOUND).json({message: 'book not found'});
    } catch (e) {
      logger.error(JSON.stringify(e));
      res.status(BAD_REQUEST).json();
    }
  }
}

export default new BookController();