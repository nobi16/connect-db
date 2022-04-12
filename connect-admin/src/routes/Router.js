import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Register from "../Register.js";
import ServiceProduct from "../views/ui/ServiceProduct.js";

/****Layouts*****/
const Login = lazy(() => import("../Login.js"));
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Adminbusiness = lazy(() => import("../views/ui/Adminbusiness"));
const Adminservice = lazy(() => import("../views/ui/Adminservice"));
const Addbusiness = lazy(() => import("../views/ui/Addbusiness"));
const Addservice = lazy(() => import("../views/ui/Addservice"));
const Updatebusiness = lazy(() => import("../views/ui/Updatebusiness"));
const Updateservice = lazy(() => import("../views/ui/Updateservice"));
const AdminProducts = lazy(() => import("../views/ui/Adminproducts.js"));
const AddProduct = lazy(() => import("../views/ui/Addproduct.js"));
const UpdateProduct = lazy(() => import("../views/ui/Updateproduct.js"));
const EditProfile = lazy(() => import("../views/ui/EditProfile"));

// const Login = lazy(() => import("../Login"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    // path: "/",
    // element: <Login />,
    children: [
      // { path: "/main", exact: true, element: <Main /> },
      { path: "/", exact: true, element: <Adminbusiness /> },
      { path: "/adminservice", exact: true, element: <Adminservice /> },
      { path: "/adminproduct", exact: true, element: <AdminProducts /> },
      { path: "/addbusiness", exact: true, element: <Addbusiness /> },
      { path: "/serviceandproduct", exact: true, element: <ServiceProduct /> },
      { path: "/addservice", exact: true, element: <Addservice /> },
      { path: "/addproduct", exact: true, element: <AddProduct /> },
      { path: "/updatebusiness", exact: true, element: <Updatebusiness /> },
      { path: "/updateservice", exact: true, element: <Updateservice /> },
      { path: "/updateproduct", exact: true, element: <UpdateProduct /> },
      { path: "/editprofile", exact: true, element: <EditProfile /> },
      { path: "/register", exact: true, element: <Register /> },

    ],
  },
 
];

const WithOutThemeRoutes = [
  {
    path: "/login",
    // element: <FullLayout />,
    // path: "/",
    // element: <Login />,
    children: [
      { path: "/login", exact: true, element: <Login /> },
    ],
  },
 ]
export default ThemeRoutes;
