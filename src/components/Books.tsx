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
import { useState } from "react";
import EditForm from "../pages/user/edit/editForm";

interface Props{
  data1: any;
}

export default function books({Props}:any) {
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    setShowModal(false);
  };

  const columns1 = [
    { name: "Cover", uid: "cover" },
    { name: "Title", uid: "title" },
    { name: "Author", uid: "author" },
    { name: "Avarage rating", uid: "Avarage rating" },
    { name: "Rating", uid: "Rating" },
    { name: "Shelves", uid: "Shelves" },
    { name: "Review", uid: "Review" },
    { name: "Date read", uid: "Date read" },
    { name: "Date added", uid: "Date added" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const users1 = [
    {
      id: 3,
      cover: "https://i.pravatar.cc/150?u=fa1f04f2b33c2d006ae7",
      title: "1984",
      author: "George Orwell",
      "Avarage rating": "4.17",
      Rating: "5",
      Shelves: "Read",
      Review: "A must-read for everyone!",
      "Date read": "2022-03-01",
      "Date added": "2021-10-01",
    },
    {
      id: 4,
      cover: "https://i.imgur.com/yznyAFM.jpg",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      "Avarage rating": "4.27",
      Rating: "4",
      Shelves: "Read",
      Review: "A classic romance novel!",
      "Date read": "2022-04-01",
      "Date added": "2021-09-01",
    },
    {
      id: 5,
      cover: "https://i.pravatar.cc/150?u=9ddc2dd449e912ea12c2",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      "Avarage rating": "3.81",
      Rating: "3",
      Shelves: "Read",
      Review: "Not my favorite book, but still worth reading.",
      "Date read": "2022-05-01",
      "Date added": "2021-08-01",
    },
    {
      id: 6,
      cover: "https://i.imgur.com/CYRJ2WR.jpg",
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      "Avarage rating": "4.49",
      Rating: "5",
      Shelves: "Currently Reading",
      Review: "A fantastic adventure!",
      "Date read": "",
      "Date added": "2022-03-15",
    },
  ];

  const renderCell = (user: any, columnKey: any) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "cover":
        console.log("cover");
        return <img src={user.cover} alt="cover" width="100" height="150" />;
      case "Avarage rating":
        return parseFloat(cellValue).toFixed(2);
      case "actions":
        return (
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
            <Link href={`/user/detail/${user.id}`}>
              <h2>View</h2>
            </Link>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Table
      aria-label="Example table with custom cells"
      css={{
        height: "700px",
        minWidth: "70%",
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns1}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={users1}>
        {(item) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}
