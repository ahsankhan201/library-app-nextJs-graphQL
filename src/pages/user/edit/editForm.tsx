import client from "@/apolloClientIntercept";
import Ratings from "@/components/ratings";
import {
  Get_Book_ById_Query,
  Rate_Specific_Book,
} from "@/services/query/books";
import { Get_Image_Url } from "environment";
import { useEffect, useState } from "react";
import ReactStars from "react-stars";
import toast, { Toaster } from "react-hot-toast";
interface Props {
  userid: any;
}

const editForm = ({ userid }: Props) => {
  const [boodId, setBookId] = useState<any>(userid);
  const [bookDetail, setBookdetail] = useState<any>();
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState(0);

  const getBookById = async () => {
    try {
      const book = boodId.toString();
      const { data } = await client.mutate({
        mutation: Get_Book_ById_Query,
        variables: { bookId: book },
      });
      setBookdetail(data.book);
    } catch (error) {
      toast("Something went wrong");
    }
  };

  const giveRatingAndComment = async () => {
    const { data } = await client.mutate({
      mutation: Rate_Specific_Book,
      variables: {
        rating: { book_id: userid, stars: stars, comment },
      },
    });
  };

  useEffect(() => {
    getBookById();
  }, []);

  return (
    <div className="w-4/5">
      <div className="p-4 bg-white rounded-lg">
        <div className="flex border-b flex-row space-between">
          <div>
            <img
              className="w-52"
              src={`${Get_Image_Url}${bookDetail?.cover_Image}`}
              alt=""
            />
          </div>
          <div className="text-black px-4">
            <h2 className="text-base font-bold mb-2">{bookDetail?.title}</h2>
            <p className="mb-2 text-left">by {bookDetail?.author}</p>
          </div>
        </div>
        <div className="flex flex-row">
          <p>My Rating</p>
          <ReactStars
            onChange={(event: any) => {
              const stars = event;
              setStars(stars.toString());
            }}
            count={5}
            size={24}
            color2={"#ffd700"}
            color1={"grey"}
            value={
              bookDetail?.average_rating ? bookDetail?.average_rating : stars
            }
          />
        </div>
      </div>
      <div className="px-4 pb-4">
        <p className="border-t text-left">What did you think?</p>
        <textarea
          className="border rounded w-full"
          name="review"
          id="review"
          cols={30}
          rows={10}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <Toaster />
      <div className="flex flex-row justify-between px-4 my-4">
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded-lg"
          onClick={() => {
            giveRatingAndComment();
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default editForm;
