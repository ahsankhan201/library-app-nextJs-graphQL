import { useCallback, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import client from "../../apolloClientIntercept";
import styles from "@/styles/Register.module.css";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { LOGIN_MUTATION } from "@/services/query/user";

export default function LoginPage() {
  const { t } = useTranslation();
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
    return <Link href="/">{t("back_to_homepage")}</Link>;
  }

  return (
    <>
      <Head>
        <title>Login | Goodreads Clone</title>
      </Head>
      <div className="flex justify-center items-center h-screen">
        <div className="w-screen md:w-96 p-4 md:p-0">
          <h1 className="text-4xl text-center font-bold mb-2.5">
          GOODREADS
            {/* {/ {t("GOODREADS")} /} */}
          </h1>
          <h1 className="text-4xl text-center font-bold mb-2.5">
          SIGN_IN
            {/* {/ {t("SIGN_IN")} /} */}
          </h1>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="text-gray-700 block font-bold mb-2"
              >
                EMAIL
                {/* {/ {t("EMAIL")} /} */}
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
                <label htmlFor="password" className="text-gray-700 font-bold">
                PASSWORD
                  {/* {/ {t("PASSWORD")} /} */}
                </label>
                <a href="#" className="underline">
                FORGOT_PASSWORD
                  {/* {/ {t("FORGOT_PASSWORD")} /} */}
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
              className="w-full bg-blue-500 h-9 text-white px-4 rounded-3xl hover:bg-blue-600"
            >
              SIGN_IN

              {/* {/ {t("SIGN_IN")} /} */}
            </button>
          </form>
          <div>
            <section className={styles.divider}>
              <p className="mt-8 z-10 px-2 text-center">
              DONT_HAVE_ACCOUNT
                {/* {/ {t("DONT_HAVE_ACCOUNT")} /} */}
              </p>
            </section>
            <Link href="/user/register">
              <button className="w-full border-2 mt-4 h-9 px-4 rounded-3xl hover:bg-gray-200">
              SIGN_UP
                {/* {/ {t("SIGN_UP")} /} */}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
