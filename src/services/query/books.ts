import { gql } from "@apollo/client";
export const Create_Book_Mutation = gql`
  mutation Mutation($book: BookInput!) {
    createBook(book: $book) {
      _id
      author
      cover_Image
      date
      title
    }
  }
`;

export const Get_All_Books_Query = gql`
query Query {
  books {
    _id
       title
    author
    average_rating
    cover_Image
    date
    ratings {
      user_id
      stars
      comment
      book_id
      _id
    }

}

}
`;

export const Get_Book_ById_Query = gql`
query Query($bookId: ID!) {
  book(id: $bookId) {
    _id
    title
    author
    average_rating
    cover_Image
    date
    ratings {
      _id
      book_id
      comment
      stars
      user_id
    }
  }
}
`

export const Set_The_Selves = gql`
mutation Mutation($shelve: ShelveInput!) {
  createShelve(shelve: $shelve) {
    _id
    book_id
    status
    user_id
  }
}
`

export const Login_User_Books = gql`
query Query {
  shelves {
    _id
    book_id
    status
    user_id
  }
}
`
