import client from "@/apolloClientIntercept";
import { Rate_Specific_Book } from "@/services/query/books";
import React from "react";
import ReactStars from "react-stars";
import { useRouter } from "next/router";
const Ratings = ({ user }: any) => {
    const router = useRouter();

  const change_Routing = async (rating: any) => {
    const { data } = await client.mutate({
      mutation: Rate_Specific_Book,
      variables: {
        rating: { book_id: user.book_id, stars: rating.toString(), comment: "wow" },
      },
    });
  };

  return (
    <>
    
      <div className="flex justify-center">
      <ReactStars
        edit={router.pathname === "/" ? false : true}
        onChange={(event: any) => {
          change_Routing(event);
        }}
        count={5}
        size={24}
        color2={"#ffd700"}
        color1={"grey"}
        value={user?.average_rating ? user?.average_rating : 0}
      />
      </div>
    </>
  );
};

export default Ratings;
