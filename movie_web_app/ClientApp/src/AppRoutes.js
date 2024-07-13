import { Home } from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import Registration from "./components/Registration";

const AppRoutes = [
  {
    path: "/",
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
