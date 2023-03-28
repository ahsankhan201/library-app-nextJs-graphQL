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

import LoginPage from "./pages/user/login";

export function ProtectedRoutes({ cookies, children }: any) {

  return <>{cookies?.user ? children : <LoginPage />}</>;
}
