import { useCallback, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import client from "../../../src/apollo-client";
import { LOGIN_MUTATION } from "../../utils/mutation";
export default function LoginPage() {
  const router = useRouter();
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
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-2xl font-bold mb-4">Log In</h1>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 p-2 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 p-2 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Log In
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link href="/signup">
              <button className="text-blue-500 hover:underline">Sign Up</button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

// async function handleSubmit(email: any, password: any) {
//   console.log("handleSubmit", email, password);
//   const { data } = await client.mutate({
//     mutation: LOGIN_MUTATION,
//     variables: {
//       user: { email, password },
//     },
//   });
//   return data.login;
// }

// function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
//   event.preventDefault();
//   handleSubmit(email, password)
//     .then((result) => console.log(result))
//     .catch((error) => console.error(error));
// }
