import { Home } from "./components/Home";
import MovieDetails from "./components/MovieDetails";

const AppRoutes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/movie/:id",
    element: <MovieDetails />
  }
];

export default AppRoutes;
