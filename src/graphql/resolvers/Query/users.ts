import { User } from '../../../models/User';
import UserModel from 'src/models/User';

export const userResolver = async (
  _parent: any,
  { user_id }: { user_id: string },
  req: any,
): Promise<User> => {
  const user: User | null = await UserModel.findById(user_id);
  if (user == null) {
    throw new Error('user not found');
  }
  return user;
}

export const usersResolver = async (
  _parent: any,
  _args: any,
  req: any,
): Promise<User[]> => {
  const users: User[] = await UserModel.find();
  return users;
}