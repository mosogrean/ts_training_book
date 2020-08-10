import { User } from '../../../models/User';
import UserModel from 'src/models/User';
import { transformUser } from './merge';

export const userResolver = async (
  _parent: any,
  { user_id }: { user_id: string },
  req: any,
): Promise<User> => {
  const user: User | null = await UserModel.findById(user_id);
  if (user == null) {
    throw new Error('user not found');
  }
  return transformUser(user);
}

export const usersResolver = async (
  _parent: any,
  _args: any,
  req: any,
): Promise<Promise<User>[]> => {
  const users: User[] = await UserModel.find();
  return users.map((user: User): Promise<User> => {
    return transformUser(user);
  })
}