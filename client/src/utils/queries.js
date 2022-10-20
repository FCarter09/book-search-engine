import { gql } from '@apollo/client';


export const QUERY_BOOKS = gql`
    query books($username: String) {
        books(username: $username) {
            bookId
            authors
            description
            title
            image
            link
        }
    }
`;

  export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

export const GET_ME = gql`
  {
    me {
        query user($username: String!) {
            user(username: $username) {
                _id
                username
                email
                bookCount
                savedBooks {
                    bookId
                    authors
                    description
                    title
                    image
                    link
                }
            }
          }
    }
  }
`;




