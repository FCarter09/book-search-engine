import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($_id: ID!, $bookId: String!) {
    saveBook(_id: $_id, bookId: $bookId) {
        _id
        username
        bookCount 
        savedBooks {
          bookId
          title
          authors
          description
          image
          link
        }
    }
 }
`;

export const DELETE_BOOK = gql`
  mutation removeBook($_id: ID!, $bookId: String!) {
    removeBook(_id: $_id, bookId: $bookId) {
        _id
        username
        bookCount
        savedBooks {
            bookId
            authors
            title
            description
            image
            link
        }
    }
  }



`