import { Home } from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import Registration from "./components/Registration";
import Login from "./components/Login";
import UserAccount from "./components/UserAccount";
import ResetPassword from "./components/ResetPassword";


const AppRoutes = [
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/movie/:id",
    element: <MovieDetails />
  },
  {
    path:"/registration",
    element: <Registration/>
  },
  {
    path:"/account",
    element: <UserAccount/>
  },
  {
    path:"/resetpassword",
    element: <ResetPassword/>
  }
];

export default AppRoutes;
