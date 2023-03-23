import Link from "next/link";
import AllRoutes from "../../constants/AllRoutes";
const Navbar = () => {
  return (

      <nav>
        <ul>
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
