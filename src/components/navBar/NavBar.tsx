import Link from "next/link";
import AllRoutes from "../../constants/AllRoutes";
const Navbar = () => {
  return (

    <nav className="fixed inset-x-0 top-0">
      <ul className="">
        {AllRoutes.map((route: any, index: any) => (
          <li key={index}>
            <Link href={route.route}>{route.name}</Link>
          </li>
        ))}
      </ul>
    </nav>

);
};

export default Navbar;
