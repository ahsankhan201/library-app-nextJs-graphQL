import Head from "next/head";
import { useState } from "react";
import {Create_Book_Mutation} from '../utils/mutation'
import {ReadingStatus} from '../constants/data'
import client from "../apollo-client";


export default function NewBook() {
  const [collection, setCollection] = useState(ReadingStatus);
  const [book, setBook] = useState({
    title: "",
    author: "",
    coverImage: null,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | any | File>) => {
    const { name, value, files } = event.target;
    console.log("file", files);
    setBook((prevState) => ({ ...prevState, [name]: files?.[0] || value }));
  };
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!book.coverImage) {
        console.log("No image selected");
        return;
      }
      const coverImageBase64 = await convertImageToBase64(book?.coverImage);
      const { data } = await client.mutate({
        mutation: Create_Book_Mutation,
        variables: {
          book: {
            title: book.title,
            author: book.author,
            cover_Image: coverImageBase64,
          },
        },
      });
      console.log("Success!", data);
    } catch (error) {
      console.error(error);
    }
    console.log(book);
  };;

const convertImageToBase64 = (imageFile: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};
  



  return (
    <>
      <Head>
        <title>Add New Book</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>
        <h1 className="mt-2 text-center">Add New Book</h1>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="max-w-lg mx-auto my-8"
        >
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={book.title}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 block w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="author" className="block font-medium text-gray-700">
              Author:
            </label>
            <input
              type="text"
              id="author"
              name="author"
              required
              value={book.author}
              onChange={handleInputChange}
              className="mt-1 px-4 py-2 block w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cover-image"
              className="block font-medium text-gray-700"
            >
              Cover Image:
            </label>
            <input
              type="file"
              id="cover-image"
              name="coverImage"
              accept="image/*"
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>

          {/* <div>
            <label
              htmlFor="collectionId"
              className="block font-medium text-gray-700"
            >
              Collection:
            </label>
            <select
              id="collection"
              name="collection"
              required
              value={book.collectionId}
              className="mt-1 px-4 py-2 block w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">--Select Collection--</option>
              {collection?.map((collection: any) => (
                <option key={collection.id} value={collection.value}>
                  {collection.name}
                </option>
              ))}
            </select>
          </div> */}

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
