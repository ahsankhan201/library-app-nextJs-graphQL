import LoginPage from "./pages/user/login";
import { useRouter } from "next/router";
import Register from "./pages/user/register";

export function ProtectedRoutes({ cookies, children }: any) {
  const router=useRouter();
  if(router.pathname=="/user/register"){
    return (
      <Register />
    )
  }
  else{
    return <>{cookies?.user ? children : <LoginPage />}</>;
  }

}

// return <>{cookies?.user ? children : <LoginPage />}</>;