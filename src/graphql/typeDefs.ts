import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    role: Int!
    created_at: String!
    updated_at: String!
  }

  type Query {
    users: [User!]!
  }
`
export default typeDefs;

