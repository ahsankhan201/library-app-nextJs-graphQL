import Head from "next/head";
import { useEffect, useState } from "react";
import client from "../apolloClientIntercept";
import { convertImageToBase64 } from "@/utils/utils";
import { useRouter } from "next/router";
import { Update_Book_By_Admin } from "@/services/query/books";

export default function EditBook({ userData, setShowModal }: any) {
  const router = useRouter();
  const [fileChange, setFileChange] = useState(false);
  const [book, setBook] = useState({
    title: userData.title,
    author: userData.author,
    coverImage: userData.cover_Image,
    bookId: userData._id,
  });

  const handleInputChange =async (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | any | File
    >
  ) => {
    const { name, value, files } = event.target;
    if (files) {
      const base64Image = await convertImageToBase64(files?.[0]);
      console.log("base64Image", base64Image)
      setBook((prevState) => ({ ...prevState, [name]: base64Image }));
    } else {
      setBook((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(userData)
      const { data } = await client.mutate({
        mutation: Update_Book_By_Admin,
        variables: {
          updateBookId: book.bookId,
          book: {
            title: book.title,
            author: book.author,
            cover_Image: book.coverImage,
          },
        },
      });
      if (data) {
        setShowModal(false);
        router.push("/");
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Add New Book</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>
        <h1 className="mt-8 text-center text-4xl font-bold">Add New Book</h1>
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
              className="mt-1 px-4 rounded-3xl bg-neutral-50 h-9 py-2 block w-full border focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              className="mt-1 px-4 rounded-3xl bg-neutral-50 h-9 py-2 block w-full border focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cover-image"
              className="block font-medium text-gray-700"
            >
              Cover Image:
            </label>
            <div className="flex mt-2 items-center justify-between">
              <input
                type="file"
                id="cover-image"
                name="coverImage"
                accept="image/*"
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer"
              >
                Update Book
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
