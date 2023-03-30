import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import client from "../../apolloClientIntercept";
import { Register_MUTATION } from "@/services/query/user";
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      if(!email || !password || !name) {
        toast("Kindly fill all fields")
      }
      const { data } = await client.mutate({
        mutation: Register_MUTATION,
        variables: { user: { email, password, name } },
      });
      router.push("/user/login");
    } catch (error) {
      toast("Something went wrong")
  
    }
  }

  return (
    <>
      <Head>
        <title>Register | Goodreads Clone</title>
      </Head>

      <div
        style={{
          borderRadius: "4px",
          position: "relative",
          padding: "14px 18px",
        }}
      >
        <div className="w-screen mx-auto p-4 md:w-96">
          <h1 className="text-4xl text-center font-bold mb-4">Goodreads</h1>
          <h1 className="text-4xl text-center font-bold mb-4">
            Create Account
          </h1>
          <form onSubmit={handleSubmit}>
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
                className="w-full h-9 border border-gray-300 p-2 rounded-3xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full h-9 border border-gray-300 p-2 rounded-3xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                className="w-full h-9 border border-gray-300 p-2 rounded-3xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-3xl hover:bg-blue-600"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link href="/signup">
              <button className="text-blue-500 hover:underline">Sign Up</button>
            </Link>
          </p>
          <div
            id="legalTextRow"
            className="a-row mt-2 a-spacing-top-medium a-size-small"
          >
            By creating an account, you agree to the Goodreads{" "}
            <a href="https://www.goodreads.com/about/terms">Terms of Service</a>{" "}
            and{" "}
            <a href="https://www.goodreads.com/about/privacy">Privacy Policy</a>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
}
