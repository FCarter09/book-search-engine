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
  mutation saveBook($userId: ID!, $bookId: String!, $title: String!, $description: String!) {
    saveBook(userId: $userId, bookId: $bookId, title: $title, description: $description) {
      _id
      bookCount
      savedBooks {
        bookId
        title
        description
      }
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