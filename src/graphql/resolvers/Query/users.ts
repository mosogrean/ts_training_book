import { User } from '../../../models/User';


export const usersResolver = async (
  _parent: any,
  _args: any,
  req: any,
): Promise<User[]> => {
  return [{
    name: 'mos',
    email: 'mos@mos.com',
    role: 1,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    name: 'mos2',
    email: 'mos@mos.com',
    role: 2,
    created_at: new Date(),
    updated_at: new Date(),
  }]
}