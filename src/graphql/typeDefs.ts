import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    role: Int!
    books: [Book!]!
    created_at: String!
    updated_at: String!
  }

  type Book {
    _id: ID!
    title: String!
    author: User!
    type: String!
    status: String!
    created_at: String!
    updated_at: String!
  }

  type Query {
    user(user_id: String!): User!
    users: [User!]!

    books: [Book!]!
  }
`
export default typeDefs;

