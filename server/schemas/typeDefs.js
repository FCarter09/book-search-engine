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
input bookInput {
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
    saveBook( _id: ID!, bookId: String!, input: bookInput): User
    removeBook(_id: ID!, bookId: String!): User
}
type Auth {
    token: ID!
    user: User
  }


`;

// export the typeDefs
module.exports = typeDefs;

// ALTERNATIVE type Queries if needed
// users: [User]
// user(username: String!): User
// savedBooks(username: String): [Book]
// books: [Book]
// book(title: String!): Book



