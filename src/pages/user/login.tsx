import { useCallback, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import client from "../../../src/apollo-client";
import { LOGIN_MUTATION } from "../../utils/mutation";
import styles from "@/styles/Register.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(async () => {
    try {
      const { data } = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          user: { email, password },
        },
      });
      console.log(data.login);
    } catch (error) {
      console.error(error);
    }
  }, [email, password]);

  const handleFormSubmit = useCallback(
    (event: any) => {
      event.preventDefault();
      handleSubmit();
    },
    [handleSubmit]
  );

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
             <label
                htmlFor="password"
                className="text-gray-700 font-bold"
              >
                Password
              </label>
              <a href="#" className="underline">Forgot your password?</a>
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
          <div
           className={styles.divider}
           >
          <p className="mt-4 z-10 px-2 text-center">
            Don't have an account?{" "}
          </p>
          </div>
            <Link href="/user/register">
              <button className="w-full bg-blue-500 h-9 text-white py-2 px-4 rounded-3xl hover:bg-blue-600">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

