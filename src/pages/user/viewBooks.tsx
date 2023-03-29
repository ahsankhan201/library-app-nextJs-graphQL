import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Head from "next/head";
import Books from "@/components/Books";
import client from "../../apolloClientIntercept";
import { Login_User_Books, Shelve_By_Status } from "@/services/query/books";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const ViewBooks = ({ data }: any) => {
  const [data1, setData] = useState<any>(data);

  const getAll = async () => {
    try {
      const { data } = await client.query({
        query: Login_User_Books,
      });
      setData(data.shelves);
    } catch (error) {
      console.error(error);
    }
  };

  const Shelve_By_Status_Record = async (status: any) => {
    try {
      setData([]);
      const { data } = await client.query({
        query: Shelve_By_Status,
        variables: {
          status,
        },
      });
      setData(data.shelveByStatus);
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

      <div className="container mx-auto my-8" style={{ marginTop: "70px" }}>
        <Tabs defaultIndex={1} style={{ marginTop: "40px" }}>
          <TabList className="flex border-b border-gray-200">
            <Tab
              className="py-4 px-6 font-semibold text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => {
                Shelve_By_Status_Record("Want to Read");
              }}
            >
              Want to Read
            </Tab>
            <Tab
              className="py-4 px-6 font-semibold text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => {
                Shelve_By_Status_Record("Reading");
              }}
            >
              Reading
            </Tab>
            <Tab
              className="py-4 px-6 font-semibold text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => {
                Shelve_By_Status_Record("Read");
              }}
            >
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
