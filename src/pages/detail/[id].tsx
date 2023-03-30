import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import client from "@/apolloClientIntercept";
import { Get_Book_ById_Query } from "@/services/query/books";
import Cookies from "js-cookie";
import { Get_Image_Url } from "environment";

export default function BookDetail() {
  const router = useRouter();
  const [boodId, setBookId] = useState<any>(router.query.id);
  const [bookDetail, setBookdetail] = useState<any>();

  const getBookById = async () => {
    const book = boodId.toString();
    const { data } = await client.mutate({
      mutation: Get_Book_ById_Query,
      variables: { bookId: book },
    });
    setBookdetail(data.book);
  };

  useEffect(() => {
    setBookId(router.query.id);
    getBookById();
  }, [router.query.id]);

  return (
    <div className="w-4/5 mx-auto mt-24">
      <div className="flex flex-row space-between">
        <div>
          <img
            className="w-52"
            src={`${Get_Image_Url}${bookDetail?.cover_Image}`}
            alt=""
          />
        </div>
        <div className="text-black ml-4 px-4">
          <h2 className="text-2xl font-bold mb-2">{bookDetail?.title}</h2>
          <p className="mb-2">
            by <b>{bookDetail?.author}</b>
          </p>
          <div className="flex flex-row items-center"></div>
        </div>
      </div>
      <div className="mt-8">
      {bookDetail?.date ? new Date(bookDetail?.date * 1000).toLocaleDateString() : "Unknown"}
      </div>
    </div>
  );
}
