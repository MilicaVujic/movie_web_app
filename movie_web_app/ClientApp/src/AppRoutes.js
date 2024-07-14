import { Home } from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import Registration from "./components/Registration";
import Login from "./components/Login";

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
  },{
    path:"/registration",
    element: <Registration/>
  }
];

export default AppRoutes;
