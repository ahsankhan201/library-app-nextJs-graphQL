import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
const Navbar = () => {
  const [user, setUser] = useState<any>(Cookies.get("user"));
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const changeLanguage = (e: any) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    const user:any = Cookies.get("user");
    setUser(JSON.parse(user));
  }, [user.role]);
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/user/login");
  };

  return (
    <nav className="fixed inset-x-0 top-0">
      <div className="flex justify-between items-center w-full">
        <ul className="">
          <li>
            <Link href="/">  {t("HOME")} </Link>
          </li>
          <li>
            <Link href="/user/viewBooks"> {t("MYBOOKS")}</Link>
          </li>
          {user?.role == "Admin" && (
            <li>
              <Link href="/newBook">
                {t("Add_NewBook")}
              </Link>
            </li>
          )}

        
        </ul>
        <div className="h-full">
          <select
            className="h-full"
            name="language"
            id="language"
            value={selectedLanguage}
            onChange={changeLanguage}
          >
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
          <button
            className="ml-2 rounded-full text-white px-4 p-2 bg-blue-500 hover:bg-blue-600"
            onClick={logout}
          >
            {t("logout")}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
