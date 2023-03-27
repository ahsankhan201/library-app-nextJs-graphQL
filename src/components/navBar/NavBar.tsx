import Link from "next/link";
import React, { useState } from "react";
import AllRoutes from "../../constants/AllRoutes";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
const Navbar = () => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const changeLanguage = (e: any) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="fixed inset-x-0 top-0">
      <ul className="">
        {AllRoutes.map((route: any, index: any) => (
          <li key={index}>
            <Link href={route.route}>{route.name}</Link>
          </li>
        ))}
      </ul>
      <select
        name="language"
        id="language"
        value={selectedLanguage}
        onChange={changeLanguage}
      >
        <option value="en">English</option>
        <option value="fr">French</option>
      </select>
    </nav>
  );
};

export default Navbar;
