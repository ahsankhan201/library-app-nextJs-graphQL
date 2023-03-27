import { useState } from "react";

const editForm = () => {
  const handleSave = async () => {};

  return (
    <div className="w-4/5">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-row justify-between">
          <div>
            <img src="https://picsum.photos/200/300" alt="" />
          </div>
          <div className="border-2 text-black mr-8 p-4">
            <h2 className="text-2xl font-bold mb-2">Station Eleven</h2>
            <p className="mb-4">
              by <b>Emily St. John Mandel (Goodreads Author)</b>
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
        <div className="flex flex-row">
          <p>My Rating</p>
          <p>******</p>
          <button>clear</button>
        </div>
        <div className="flex flex-row">
          <p>Bookshelves/tags:</p>
          {/* dropdown */}
          <select name="bookshelves" id="bookshelves">
            <option value="to-read">to-read</option>
            <option value="currently-reading">currently-reading</option>
            <option value="read">read</option>
          </select>

          <button>to-read</button>
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md mt-8">
        <p>What did you think?</p>
        <textarea name="review" id="review" cols={30} rows={10}></textarea>
      </div>
      <div className="flex flex-row justify-between mt-8">
        <button className="bg-blue-500 text-white p-2 rounded-lg">Add</button>
        <button className="bg-blue-500 text-white p-2 rounded-lg">
          Preview
        </button>
      </div>
    </div>
  );
};

export default editForm;