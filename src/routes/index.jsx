import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Home from "@/pages";
import AuthLogin from "@/pages/auth/login";
import AuthRegister from "@/pages/auth/register";
import ProductsPage from "@/pages/products";
import ProductsDetail from "@/pages/products/detail";
import { useEffect } from "react";
import { setAxiosConfig } from "@/utils/apis/axiosWithConfig";
import { useToken } from "@/utils/contexts/token";

export default function Router() {
  const { token } = useToken();

  useEffect(() => {
    setAxiosConfig("", import.meta.env.VITE_BASE_URL);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/products",
      element: token === "" ? <Navigate to="/" /> : <ProductsPage />,
    },
    {
      path: "/products/:id",
      element: token === "" ? <Navigate to="/" /> : <ProductsDetail />,
    },
    {
      path: "/login",
      element: token !== "" ? <Navigate to="/" /> : <AuthLogin />,
    },
    {
      path: "/register",
      element: token !== "" ? <Navigate to="/" /> : <AuthRegister />,
    },
    {
      path: "*",
      element: <div>404 page not found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}
