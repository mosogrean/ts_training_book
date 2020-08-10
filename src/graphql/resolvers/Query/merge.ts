import UserModel, { User } from '../../../models/User';
import { User } from '../../../models/User';


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

export const transformUser = async (user: User): Promise<User> => {
  return {
    ...user._doc,
  }
}