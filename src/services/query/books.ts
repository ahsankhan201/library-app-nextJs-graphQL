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
mutation Mutation($bookId: ID!) {
  book(id: $bookId) {
    _id
    author
    average_rating
    cover_Image
    date
    title
    ratings {
      user_id
      stars
      comment
      book_id
      _id
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

export const Shelve_By_Status = gql`
query Query($status: String!) {
  shelveByStatus(status: $status) {
    _id
    average_rating

    book_id
    status
    user_id
    book {
      _id
      author
      average_rating
      cover_Image
      date
      title
    }
    ratings {
      user_id
      stars
      comment
      book_id
      _id
    }
  }
}
`

export const Login_User_Books = gql`
query Shelves {
  shelves {
    _id
    average_rating
    book_id
    status
    user_id
    ratings {
      user_id
      stars
      comment
      book_id
      _id
    }
    book {
      _id
      author
      average_rating
      cover_Image
      date
      title
    }
  }
}

`


export const Update_Book_By_Admin = gql`
mutation Mutation($updateBookId: ID!, $book: BookInput!) {
  updateBook(id: $updateBookId, book: $book) {
    _id
    author
    title
    cover_Image
    date
  }
}
`


export const Rate_Specific_Book=gql`
mutation Mutation($rating: RatingInput!) {
  createRating(rating: $rating) {
    _id
    book_id
    comment
    stars
    user_id
  }
}
`