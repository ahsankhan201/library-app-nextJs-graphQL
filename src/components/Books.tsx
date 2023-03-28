import {
  Table,
  Row,
  Col,
  Tooltip,
  User,
  Text,
  Modal,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import EditForm from "../pages/user/edit/editForm";
import ReactStars from "react-stars";
import { GetImagesUrl } from "@/constants/ApisKey";

interface Props {
  data1: any;
}

export default function books({ data1 }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(data1);

  useEffect(() => {
    setSelectedBook(data1);
    console.log("data1", data1);
  }, [data1]);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    setShowModal(false);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Cover</th>
          <th>Title</th>
          <th>Author</th>
          <th>Average rating</th>
          <th>Date added</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {selectedBook?.map((user: any) => {
          console.log("user", user);
          return (
            <tr>
              <td>
                <img
                  src={`${GetImagesUrl}${user?.cover_Image}`}
                  alt="cover"
                  width="100"
                  height="150"
                />
              </td>
              <td>{user?.title}</td>
              <td>{user?.author}</td>
              <td>
                <ReactStars
                  count={user[0]?.stars}
                  size={24}
                  color2={"#ffd700"}
                />
              </td>

              <td>{user?.date}</td>

              <td>
                <div>
                  <h2 onClick={handleEditClick}>Edit</h2>
                  <Modal
                    width="80%"
                    open={showModal}
                    onClose={handleModalClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                  >
                    <EditForm />
                  </Modal>
                  <Link href={`/detail/${user?._id}`}>
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
