import Cookies from "js-cookie";

const role:any=Cookies.get('user')
const userRole=role?.role;
const AllRoutes = [
  {
    route: "/",
    name: "Home",
  },
  {
    route: "/user/viewBooks",
    name: "MyBooks",
  },

  {
    route: "/newBook",
    name: "Add Book",
  },
];

export default AllRoutes;
