import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../mainLayout/MainLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PribetRoutes from "./PribetRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PribetRoutes>
        {" "}
        <MainLayout />
      </PribetRoutes>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
