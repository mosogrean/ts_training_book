import { Request, Response } from 'express';
import { Burrow, BurrowType } from '../models/Burrow';
import BurrowModel from '../models/Burrow';
import { OK, NOT_FOUND, BAD_REQUEST, NO_CONTENT } from 'http-status-codes';
import logger from '@shared/Logger';
import BookModel from '../models/Book';
import { User } from '../models/User';
import UserModel from '../models/User';
import { Book, BookType } from '../models/Book';


export class BurrowController {
  public all = async (req: Request, res: Response) => {
    const burrows: Burrow[] = await BurrowModel.find();
    res.status(OK).json(burrows);
  }

  public show = async (req: Request, res: Response) => {
    const { burrow_id } = req.params;

    try {
      const burrow: Burrow | null = await BurrowModel.findById(burrow_id);
      if (burrow != null) {
        res.status(OK).json(burrow);
      }
      res.status(NOT_FOUND).json({message: 'burrow not found'});
    } catch (e) {
      logger.error(JSON.stringify(e));
      res.status(BAD_REQUEST).json(e);
    }

  }

  public store = async (req: Request, res: Response) => {
    const { books, user }: {books: Book[], user: User} = req.body;

    if(books === undefined) {
      throw new Error('books not be null');
    }

    const burrow: Burrow = {
      books,
      user,
      created_at: new Date(),
      updated_at: new Date(),
    }
    logger.debug(JSON.stringify(books));
    try {
      const fetchBooks: BookType[] = await BookModel.find({ _id: { $in: burrow.books }});
      fetchBooks.map(async (book: BookType) => {
        if (book.status !== 'avaliable') {
          res.status(BAD_REQUEST).json({ message: `book id ${book._id} is not avaliable` });
        }
        book.status = 'burrow';
        await book.save();
      })
      const fetchUser: User | null = await UserModel.findById(burrow.user);
      if (fetchUser != null) {
        burrow.user = fetchUser
      }
      const burrowStored = await BurrowModel.create(burrow);
      res.status(OK).json(burrowStored);
    } catch (e) {
      logger.error(JSON.stringify(e));
      res.status(BAD_REQUEST).json(e);
    }
  }

  public delete = async (req: Request, res: Response) => {
    const { burrow_id } = req.params;

    try {
      const burrow: BurrowType | null = await BurrowModel.findById(burrow_id);
      const books = burrow?.books;
      books?.map(async (book) => {
        const fetchBook: BookType | null = await BookModel.findById(book);
        if (fetchBook != null) {
          fetchBook.status = 'avaliable';
          await fetchBook.save();
        }
      })
      res.status(NO_CONTENT).json();
    } catch (e) {
      logger.error(JSON.stringify(e));
      res.status(BAD_REQUEST).json(e);
    }
  }
}

export default new BurrowController();