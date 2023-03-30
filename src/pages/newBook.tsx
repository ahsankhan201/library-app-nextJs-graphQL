import Head from "next/head";
import { useState } from "react";
import client from "../apolloClientIntercept";
import { convertImageToBase64 } from "@/utils/utils";
import { Create_Book_Mutation } from "@/services/query/books";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function NewBook({}) {
  const { t } = useTranslation();
  const router = useRouter();
  const [book, setBook] = useState({
    title: "",
    author: "",
    coverImage: null,
  });

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | any | File
    >
  ) => {
    const { name, value, files } = event.target;
    setBook((prevState) => ({ ...prevState, [name]: files?.[0] || value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!book.coverImage) {
        return;
      }
      const coverImageBase64 = book.coverImage ? await convertImageToBase64(book?.coverImage) : null;
      const { data } = await client.mutate({
        mutation: Create_Book_Mutation,
        variables: {
          book: {
            title: book.title,
            author: book.author,
            cover_Image: coverImageBase64 ? coverImageBase64 : null,
          },
        },
      });
      router.push("/");
      
    } catch (error) {
      toast("Something went wrong")
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
        <h1 className="mt-8 text-center text-4xl font-bold">
          {t("add-new-book")}
        </h1>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="max-w-lg mx-auto my-8"
        >
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium text-gray-700">
            {t("TITLE")}:
            
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
            {t("AUTHOR")}:
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
                {t("CoverImage")}:
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
                {t("AddBook")}:
              </button>
            </div>
          </div>
        </form>
        <Toaster />
      </div>
    </>
  );
}
