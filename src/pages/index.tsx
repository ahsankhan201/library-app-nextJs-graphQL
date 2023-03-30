import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

import { Get_All_Books_Query, Set_The_Selves } from "@/services/query/books";
import client from "@/apolloClientIntercept";
import { Get_Image_Url } from "environment";
import Ratings from "@/components/ratings";
import { Modal } from "@nextui-org/react";
import EditPage from "@/components/EditBook";

export default function Home({socket}:any) {
  const router = useRouter();
  const [data1, setData] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [socketData,setSocketData] = useState<any>();




  const getAllBooks = async () => {
    try {
      const { data } = await client.mutate({
        mutation: Get_All_Books_Query,
      });
      setData(data.books);
      
     
    } catch (error) {
      console.error(error);
    }
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

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!Cookies.get("user")) {
      router.push("/user/login");
      return;
    }
    getAllBooks();
    console.log("socket data",data1)
  }, []);


  // useEffect(()=>{
  //  socket && socket?.on("book-rating", (data:any) => {
  //     console.log("socket data",data);
  //     setSocketData(data.book)
  //   }).then((data:any)=>{
  //     console.log("data1",data1)
  //   })
  //  console.log(data1)
  // },[socket])


  return (
    <>
      <Head>
        <title>GoodReads WebApp</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div
          style={{
            marginTop: "60px",
          }}
        >
          <div style={{ marginTop: "150px" }}>
            <table className="w-full">
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
                {data1?.map((user: any) => {
                  console.log("user", user);
                  return (
                    <tr>
                      <td className="text-center">
                        <img
                          className="m-auto"
                          src={`${Get_Image_Url}${user?.cover_Image}`}
                          alt="cover"
                          width="100"
                          max-height="150"
                        />
                      </td>
                      <td className="text-center">{user?.title}</td>
                      <td className="text-center">{user?.author}</td>
                      <td className="text-center">
                        <Ratings user={user} />
                      </td>

                      <td className="text-center">{user?.date}</td>
                      <td className="text-center">
                        <select
                          onChange={(event) => Set_TheSelve(event, user?._id)}
                        >
                          <option value="Want to read">Want to read</option>
                          <option value="Reading">Reading</option>
                          <option value="Read">Read</option>
                        </select>
                        <h2 onClick={handleEditClick}>Edit</h2>
                        <Modal
                          width="80%"
                          open={showModal}
                          onClose={handleModalClose}
                          aria-labelledby="modal-title"
                          aria-describedby="modal-description"
                        >
                          <EditPage
                            userData={user}
                            setShowModal={setShowModal}
                          />
                        </Modal>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
