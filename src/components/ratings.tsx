import React from "react";
import ReactStars from "react-stars";
const Ratings = ({user}:any) => {
  return (
    <>
      <ReactStars
        count={5}
        size={24}
        color2={"#ffd700"}
        color1={"grey"}
        value={user?.average_rating ? user?.average_rating : 0}
      />
    </>
  );
};

export default Ratings;
