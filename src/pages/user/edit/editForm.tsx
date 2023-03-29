import client from "@/apolloClientIntercept";
import { Get_Book_ById_Query } from "@/services/query/books";
import { Get_Image_Url } from "environment";
import { useEffect, useState } from "react";
interface Props{
  userid:any
}

const editForm = ({userid}:Props) => {
  const [boodId,setBookId] = useState<any>(userid)
  const [bookDetail, setBookdetail] = useState<any>();


  const getBookById = async () => {

    const book=boodId.toString()
    const { data } = await  client.mutate({
      mutation: Get_Book_ById_Query,     
      variables: { bookId:book },
    });
    setBookdetail(data.book);
    console.log("bookdata",data.book)
  };

  useEffect(()=>{
    getBookById();
  },[])

  return (
    <div className="w-4/5">
      <div className="p-4 bg-white rounded-lg">
        {
       
        }
        <div className="flex border-b flex-row space-between">
      <div>
        <img className="w-52" src={`${Get_Image_Url}${bookDetail?.cover_Image}`} alt="" />
      </div>
      <div className="text-black px-4">
        <h2 className="text-base font-bold mb-2">{bookDetail?.title}</h2>
        <p className="mb-2 text-left">
          by {bookDetail?.author}
        </p>
      </div>
    </div>
        <div className="flex flex-row">
          <p>My Rating</p>
          <p>******</p>
          <button>clear</button>
        </div>
        <div className="flex flex-row">
          <p>Bookshelves/tags:</p>
   
          <select className="border mx-2 rounded" name="bookshelves" id="bookshelves">
            <option value="to-read">to-read</option>
            <option value="currently-reading">currently-reading</option>
            <option value="read">read</option>
          </select>

          <button>to-read</button>
        </div>
      </div>
      <div className="px-4 pb-4">
        <p className="border-t text-left">What did you think?</p>
        <textarea className="border rounded w-full" name="review" id="review" cols={30} rows={10}></textarea>
      </div>
      <div className="flex flex-row justify-between px-4 my-4">
        <button className="bg-blue-500 text-white px-3 py-2 rounded-lg">Add</button>
        <button className="bg-blue-500 text-white px-3 py-2 rounded-lg">
          Preview
        </button>
      </div>
    </div>
  );
};

export default editForm;
