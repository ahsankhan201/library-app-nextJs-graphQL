import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { appWithTranslation } from "next-i18next";
import Navbar from "../components/navBar/NavBar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ProtectedRoutes } from "../routeProtecter";
import { I18nextProvider } from "react-i18next";
import { io } from "socket.io-client";

import i18n from "../../src/i18n";
function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    i18n.loadLanguages(["en", "fr", "de"]);
    // if(Cookies.get("user")){
    // const socket = io("http://localhost:4000");
    //   setSocket(socket);
    // }
  }, []);

  


  return (
    <>
      {Cookies.get("user") ? <Navbar /> : null}
      <I18nextProvider i18n={i18n}>
        <NextUIProvider>
          <ProtectedRoutes
            nextUrl="/user/login"
            cookies={{ user: Cookies.get("user") }}
          >
            <Component {...pageProps} />
          </ProtectedRoutes>
        </NextUIProvider>
      </I18nextProvider>
    </>
  );
}

export default appWithTranslation(App);
