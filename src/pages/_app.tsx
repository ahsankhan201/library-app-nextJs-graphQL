import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { appWithTranslation } from "next-i18next";
import Navbar from "../components/navBar/NavBar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ProtectedRoutes } from "../routeProtecter";
import { I18nextProvider } from "react-i18next";
import { io } from "socket.io-client";
import i18n from "../../src/i18n";
import { NextComponentType, NextPageContext } from "next";
import { Socket_Url } from "environment";

interface MyAppProps extends AppProps {
  socket: any;
}

function MyApp({ Component, pageProps, socket }: MyAppProps) {
  useEffect(() => {
    i18n.loadLanguages(["en", "fr", "de"]);
  }, []);

  return (
    <>
      <div className="pt-20">
        {Cookies.get("user") ? <Navbar /> : null}
        <I18nextProvider i18n={i18n}>
          <NextUIProvider>
            <ProtectedRoutes
              nextUrl="/user/login"
              cookies={{ user: Cookies.get("user") }}
            >
              <Component {...pageProps} socket={socket} />
            </ProtectedRoutes>
          </NextUIProvider>
        </I18nextProvider>
      </div>
    </>
  );
}

function MyAppWrapper({
  Component,
  pageProps,
}: AppProps & { Component: NextComponentType<NextPageContext, any, any> }) {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    if (Cookies.get("user")) {
      const socket = io(Socket_Url);
      setSocket(socket);
    }
  }, []);

  return <MyApp Component={Component} pageProps={pageProps} socket={socket} />;
}

export default appWithTranslation(MyAppWrapper);
