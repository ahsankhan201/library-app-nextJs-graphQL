import { useCallback, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import client from "../../../src/apollo-client";

import styles from "@/styles/Register.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { LOGIN_MUTATION } from "@/services/query/user";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      const { data } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          user: { email, password },
        },
      });
      Cookies.set("user", JSON.stringify(data.login.user));
      Cookies.set("token", JSON.stringify(data.login.token));
      setAuthenticated(true);
      router.push("/");
    } catch (error) {
      console.error(error);
      setAuthenticated(false);
    }
  }, [email, password]);

  const handleFormSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      handleSubmit();
    },
    [handleSubmit]
  );

  if (authenticated) {
    return <Link href="/"></Link>;
  }

  return (
    <>
      <Head>
        <title>Login | Goodreads Clone</title>
      </Head>
      <div className="flex justify-center items-center h-screen">
        <div className="w-screen md:w-96 p-4 md:p-0">
          <h1 className="text-4xl text-center font-bold mb-2.5">Goodreads</h1>
          <h1 className="text-4xl text-center font-bold mb-2.5">Log In</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="text-gray-700 block font-bold mb-2"
              >
                Email
              </label>
              <img
                src="https://ab33-124-109-45-157.au.ngrok.io/graphql/upload/1679569604609.png"
                alt=""
                width={200}
                height={200}
              />
              <input
                type="email"
                id="email"
                className="w-full rounded-3xl bg-neutral-50 h-9 border border-gray-300 p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 flex justify-between items-center">
                <label htmlFor="password" className="text-gray-700 font-bold">
                  Password
                </label>
                <a href="#" className="underline">
                  Forgot your password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                className="w-full border rounded-3xl h-9 bg-neutral-50 border-gray-300 p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 h-9 text-white py-2 px-4 rounded-3xl hover:bg-blue-600"
            >
              Log In
            </button>
          </form>
          <div>
            <div className={styles.divider}>
              <p className="mt-4 z-10 px-2 text-center">
                Don't have an account?{" "}
              </p>
            </div>
            <Link href="/user/register">
              <button className="w-full bg-blue-500 h-9 text-white py-2 px-4 rounded-3xl hover:bg-blue-600">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}


// export async function getServerSideProps(context:any) {
//   const { data } = await client.mutate({
//     mutation: LOGIN_MUTATION,
//     variables: {
//       user: { email, password },
//     },
//   });
//   return {
//     props: {
//       cookies: Cookies.parse(cookies),
//     },
//   };
// }