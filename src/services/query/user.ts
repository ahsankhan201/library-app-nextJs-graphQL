import {  gql } from "@apollo/client";

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

