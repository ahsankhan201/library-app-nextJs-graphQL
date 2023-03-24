import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "../components/navBar/NavBar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { ProtectedRoutes } from "../_middleware";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  const [authenticate, Setauthenticate] = useState(false);

  useEffect(() => {
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
      {authenticate ? <Navbar /> : null}

      <NextUIProvider>
        <ProtectedRoutes
          nextUrl="/user/login"
          cookies={{ user: Cookies.get("user") }}
        >
          <Component {...pageProps} />
        </ProtectedRoutes>
      </NextUIProvider>
    </>
  );
}

