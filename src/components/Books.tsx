import { Modal } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Get_Image_Url } from "environment";
import Ratings from "./ratings";
import EditForm from "../pages/user/edit/editForm";
import client from "@/apolloClientIntercept";
import { Set_The_Selves } from "@/services/query/books";

interface Props {
  data1: any;
}

export default function books({ data1 }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(data1);

  useEffect(() => {
    setSelectedBook(data1);
  }, [data1]);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const Set_TheSelve = async (event: any, book_id: any) => {
    try {
      const { data } = await client.mutate({
        mutation: Set_The_Selves,
        variables: {
          shelve: { book_id, status: event.target.value },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    setShowModal(false);
  };

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Cover</th>
          <th>Title</th>
          <th>Author</th>
          <th>Average rating</th>

          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data1?.map((user: any) => {
          console.log("user", user);
          return (
            <tr>
              <td className="text-center">
                <img
                  className="m-auto"
                  src={`${Get_Image_Url}${user?.book?.cover_Image}`}
                  alt="cover"
                  width="100"
                  max-height="150"
                />
              </td>
              <td className="text-center">{user?.book?.title}</td>
              <td className="text-center">{user?.book?.author}</td>
              <td className="text-center">
                <Ratings user={user} />
              </td>
              <td>
                <select value={user.status} onChange={(event) => Set_TheSelve(event, user?._id)}>
                  <option value="Want to read">Want to read</option>
                  <option value="Reading">Reading</option>
                  <option value="Read">Read</option>
                </select>
              </td>

              <td className="text-center">
                <div>
                  {user?.status == "Read" ? (
                    <h2 onClick={handleEditClick}>Review</h2>
                  ) : null}

                  <Modal
                    width="80%"
                    open={showModal}
                    onClose={handleModalClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                  >
                    <EditForm userid={user?.book_id} />
                  </Modal>
                  <Link href={`/detail/${user?.book_id}`}>
                    <h2>View</h2>
                  </Link>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
