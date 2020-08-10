import UserModel, { User } from '../../../models/User';


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
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at
  }
}