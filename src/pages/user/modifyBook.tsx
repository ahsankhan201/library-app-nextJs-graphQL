import { useState } from "react";

const ModifyBook = ({ book }: any) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("book.title");
  const [author, setAuthor] = useState("book.author");
  const [cover, setCover] = useState("book.cover");

  const handleSave = async () => {
    const data = { title, author, cover };
    // await axios.put(`/api/books/${book.id}`, data);
    // setEditing(false);
  };

  return (
    <div className="w-64 p-4 bg-white rounded-lg shadow-md">
      <img src={cover} alt={title} className="w-48 h-64 mx-auto mb-4" />
      {editing ? (
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-400 rounded-lg w-full py-2 px-3 mb-2"
          />
          <label
            htmlFor="author"
            className="block font-medium text-gray-700 mb-1"
          >
            Author
          </label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-gray-400 rounded-lg w-full py-2 px-3 mb-2"
          />
          <label
            htmlFor="cover"
            className="block font-medium text-gray-700 mb-1"
          >
            Cover URL
          </label>
          <input
            type="text"
            name="cover"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            className="border border-gray-400 rounded-lg w-full py-2 px-3 mb-2"
          />
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg py-2 px-4"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <h2 className="text-xl font-medium mb-2">{title}</h2>
          <p className="text-gray-600">{author}</p>
        </div>
      )}
      <div className="flex justify-between">
        <button
          onClick={() => setEditing(!editing)}
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          Edit
        </button>
        <button className="text-red-500 hover:text-red-600 font-medium">
          Delete
        </button>
      </div>
    </div>
  );
};


export default ModifyBook;