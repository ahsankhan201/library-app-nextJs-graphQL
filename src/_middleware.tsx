// import { useRouter } from "next/router";
// import { useEffect } from "react";

// export function ProtectedRoutes({ nextUrl, cookies, children }: any) {
//   const router = useRouter();
//   const user = cookies?.user;

//   useEffect(() => {
//     if (!user) {
//       router.push(nextUrl);
//     }
//   }, [user]);

//   return <>{children}</>;
// }


import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginPage from "./pages/user/login";

export function ProtectedRoutes({ nextUrl, cookies, children }: any) {
  const router = useRouter();
  const user = cookies?.user;
  const [isAuthorized, setIsAuthorized] = useState(user);

  useEffect(() => {
    if (!user) {
      router.push(nextUrl);
    } else {
      setIsAuthorized(true);
    }
  }, [user]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!isAuthorized && url !== nextUrl) {
        router.push(nextUrl);
        return;
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [isAuthorized]);

  return <>{isAuthorized ? children : <LoginPage />}</>;
}
