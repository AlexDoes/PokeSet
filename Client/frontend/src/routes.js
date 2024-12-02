import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Dashboard } from "./components/Dashboard";
import CardsList from "./components/CardsList";

export const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/cards", element: <CardsList /> },
  { path: "/register", element: <Register /> },
  { path: "/", element: <Home /> },
];

export const privateRoutes = [{ path: "/dashboard", element: <Dashboard /> }];
