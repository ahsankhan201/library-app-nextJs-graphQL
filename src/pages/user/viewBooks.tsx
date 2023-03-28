import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Head from "next/head";
import Books from "@/components/Books";
import client from "../../../src/apollo-client";
import { GetImagesUrl } from "@/constants/ApisKey";
import { Get_All_Books_Query,Login_User_Books } from "@/services/query/books";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const ViewBooks = ({ data }: any) => {
  const [data1, setData] = useState<any>(data);
const [token, setToken] = useState<any>(Cookies.get("token"));

  useEffect(() => {
    console.log("data", data);
    setToken(Cookies.get("token"));
    console.log("token", token,Cookies.get("token"));
  },[]);

  const getAll = async () => {
    console.log("get Token",token)
    try {
      const { data } = await client.query({
        query: Login_User_Books,
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      setData(data.books);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <Head>
        <title>View Books - My Library</title>
      </Head>

      <div className="container mx-auto my-8" style={{marginTop:'70px'}}>
        <Tabs defaultIndex={1} style={{marginTop:'40px'}}>
          <TabList className="flex border-b border-gray-200">
            <Tab className="py-4 px-6 font-semibold text-gray-600 hover:text-gray-800 focus:outline-none">
              Want to Read
            </Tab>
            <Tab className="py-4 px-6 font-semibold text-gray-600 hover:text-gray-800 focus:outline-none">
              Reading
            </Tab>
            <Tab className="py-4 px-6 font-semibold text-gray-600 hover:text-gray-800 focus:outline-none">
              Read
            </Tab>
          </TabList>
          <TabPanel>
            <Books data1={data1} />
          </TabPanel>
          <TabPanel>
            <Books data1={data1} />
          </TabPanel>
          <TabPanel>
            <Books data1={data1} />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default ViewBooks;
