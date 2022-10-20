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
  mutation saveBook($bookId: String!) {
    saveBook(bookId: $bookId) {
      bookId
      authors
      title
      description
      image
      link
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation removeBook($userId: ID!, $bookId: String!) {
    removeBook(userID: $userId, bookId: $bookId) {
        _id
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