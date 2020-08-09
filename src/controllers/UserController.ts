import { Request, Response } from 'express';

import UserDao from '@daos/User/UserDao.mock';
import { OK, BAD_REQUEST, NOT_FOUND, ACCEPTED, NO_CONTENT } from 'http-status-codes';
import logger from '@shared/Logger';
import { User, UserType } from '../models/User';
import UserModel from '../models/User';

const userDao = new UserDao();

export class UserController {
  public all = async (req: Request, res: Response) => {
    const users: User[] = await UserModel.find();
    res.status(OK).json(users);
  }

  public show = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    try {
      const user: User | null = await UserModel.findById(user_id);
      res.status(OK).json(user);
    } catch (e) {
      res.status(NOT_FOUND).json({message: 'user not found'})
    }
  }

  public store = async (req: Request, res: Response): Promise<void> => {
    logger.info('store new users');
    const { name, email, role } = req.body;
    const user: User = {
      name,
      email,
      role,
      created_at: new Date(),
      updated_at: new Date(),
    };
    try {
      const userStored: User = await UserModel.create(user);
      logger.debug(JSON.stringify(userStored))
      res.status(OK).json(userStored);
    } catch (e) {
      logger.error(e);
      res.status(BAD_REQUEST).json({
        message: 'user cannot insert'
      });
    }
  }

  public update = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const { name, email, role } = req.body;

    try {
      const user: User | null = await UserModel.findByIdAndUpdate(
        user_id, { $set: {
          name,
          email,
          role,
        }}).then(
          () => UserModel.findById(user_id)
      );
      if (user == null) {
        res.status(NOT_FOUND).json({message: 'user not found'});
      }
      res.status(ACCEPTED).json(user);
    } catch (e) {
      res.status(BAD_REQUEST);
    }
  }

  public delete = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    logger.debug(user_id);
    try {
      const user: UserType | null = await UserModel.findById(user_id);
      if (user == null) {
        res.status(NOT_FOUND).json({message: 'user not found'});
      }
      user?.remove();
      res.status(NO_CONTENT).json();
    } catch (e) {
      res.status(BAD_REQUEST);
    }
  }
}

export default new UserController();