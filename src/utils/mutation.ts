import { useQuery, gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
mutation Login($user: UserLoginInput!) {
  login(user: $user) {
    token
    user {
      _id
      email
      name
      role
    }
  }
}
`;


export const Register_MUTATION = gql`
mutation CreateUser($user: UserInput!) {
    createUser(user: $user) {
      email
      name
      password
    }
}
`;

export const Create_Book_Mutation=gql`
mutation Mutation($book: BookInput!) {
  createBook(book: $book) {
    _id
    author
    cover_Image
    date
    title
  }
}
`

export const Get_All_Books_Query=gql`
query Query {
  books {
    _id
    author
    cover_Image
    date
    title
  }
}
`


