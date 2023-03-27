import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { appWithTranslation } from "next-i18next";
import Navbar from "../components/navBar/NavBar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ProtectedRoutes } from "../_middleware";
import { I18nextProvider } from "react-i18next";
import i18n from "../../src/i18n";
function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const [authenticate, Setauthenticate] = useState(false);

  useEffect(() => {
    i18n.loadLanguages(["en", "fr", "de"]);
    if (
      !Cookies.get("user") ||
      router.pathname === "/user/login" ||
      router.pathname === "/user/register"
    ) {
      Setauthenticate(false);
      router.push("/user/login");
      return;
    }
    if (Cookies.get("user")) {
      Setauthenticate(true);
      return;
    }
  }, [authenticate]);

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
