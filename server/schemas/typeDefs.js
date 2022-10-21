// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}
type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}
type Query {
    me: User
    users: [User]
    user(username: String!): User
}
type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(userId: ID!, bookId: String!, title: String!, description: String!): User
    removeBook(bookId: String!): User
}
type Auth {
    token: ID!
    user: User
  }


`;

// export the typeDefs
module.exports = typeDefs;



