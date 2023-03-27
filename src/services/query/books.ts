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
