import * as users from './users'
import * as books from './books'

export default {
  user: users.userResolver,
  users: users.usersResolver,

  books: books.booksResolver,
}
