import { useRouter } from "next/router";
import { useEffect } from "react";

export function ProtectedRoutes({ nextUrl, cookies, children }: any) {
  const router = useRouter();
  const user = cookies?.user;

  useEffect(() => {
    if (!user) {
      router.push(nextUrl);
    }
  }, [user]);

  return <>{children}</>;
}
