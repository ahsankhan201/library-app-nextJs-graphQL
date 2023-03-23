import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Head from "next/head";
import Books from "@/components/Books";
import {Get_All_Books_Query} from '../../utils/mutation'
import client from "../../../src/apollo-client";
import { useEffect, useState } from "react";

const ViewBooks = () => {
  const [data1,setData]=useState<any>([])
  const getAll=async()=>{
    try {
      const { data } = await client.mutate({
        mutation: Get_All_Books_Query,
      });
      setData(data.books);
      console.log("Success!", data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(()=>{
   getAll();
  },[])
  return (
    <>
      <Head>
        <title>View Books - My Library</title>
      </Head>
     
      <div className="container mx-auto my-8">
        <Tabs defaultIndex={1}>
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
            <Books />
          </TabPanel>
          <TabPanel>
            <Books />
          </TabPanel>
          <TabPanel>
            <Books />
          </TabPanel>
        </Tabs>
      </div>
      <div>
        {
          data1?.map((item:any)=>{
            return(
              <img src={"https://4dcb-124-109-45-157.in.ngrok.io/images/"+ item.cover_Image} alt="" width={200} height={200} />
            )
          })
        }
      </div>
    </>
  );
};

export default ViewBooks;
