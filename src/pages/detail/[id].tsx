import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ObjectId from "bson-objectid";
import client from "@/apollo-client";
import { Get_Book_ById_Query } from "@/services/query/books";
import Cookies from "js-cookie";
import { GetImagesUrl } from "@/constants/ApisKey";

export default function BookDetail() {
  const router = useRouter();
  const [boodId, setBookId] = useState<any>();
  const [token, setToken] = useState<any>("");
  const [bookDetail, setBookdetail] = useState<any>();

  const getBookById = async () => {
    let bookIds = new ObjectId(boodId);
    console.log(router.query.id);
    const { data } = await client.query({
      query: Get_Book_ById_Query,
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    
      variables: { bookId:bookIds },
    });
    setBookdetail(data.book);
  };

  useEffect(() => {
    setToken(Cookies.get("token"));
    setBookId(router.query.id)
    getBookById();
  }, [router.query.id]);

  return (
    <div className="w-4/5 ml-4 mt-24">
      <div className="flex flex-row space-between">
        <div>
          <img src={`${GetImagesUrl}${bookDetail?.cover_Image}`} alt="" />
        </div>
        <div className="border-2 text-black mr-8 p-4">
          <h2 className="text-2xl font-bold mb-2">{bookDetail?.title}</h2>
          <p className="mb-4">
            by <b>{bookDetail?.author}</b>
          </p>
          <div className="flex flex-row items-center">
            <img
              src="https://picsum.photos/200/300"
              alt=""
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <p className="text-lg font-bold">Waqas's review</p>
              <p className="text-sm">bookshelves: to-read</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2">READING PROGRESS</h2>
        <div className="flex flex-row">
          <div className="w-4 h-4 bg-blue-500 rounded-full mr-4"></div>
          <p>March 22, 2023 – Shelved</p>
        </div>
        <div className="flex flex-row">
          <div className="w-4 h-4 bg-blue-500 rounded-full mr-4"></div>
          <p>March 22, 2023 – Shelved as: to-read</p>
        </div>
      </div>
      <div className="mt-8 flex flex-row">
        <h2 className="text-2xl font-bold mb-2">COMMENTS</h2>
        <h2 className="text-2xl font-bold mb-2">Post a comment »</h2>
      </div>
    </div>
  );
}
