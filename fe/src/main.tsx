import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import { lazy } from "react";
import User from "./pages/User/User.tsx";
import { ProductProvider } from "./context/product.context.tsx";

const Admin = lazy(() => import("./pages/Admin/Admin.tsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route
        path="admin"
        element={
          <ProductProvider>
            <Suspense fallback={<div>Loading Admin...</div>}>
              <Admin />
            </Suspense>
          </ProductProvider>
        }
      />
      <Route
        path="user"
        element={
          <ProductProvider>
            <Suspense fallback={<div>Loading User...</div>}>
              <User />
            </Suspense>
          </ProductProvider>
        }
      />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
