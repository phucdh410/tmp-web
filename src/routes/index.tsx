import { Outlet, RouteObject } from "react-router-dom";

import { CErrorPage } from "@others";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Outlet />,
    errorElement: <CErrorPage />,
    children: [],
  },
  {
    path: "*",
    element: <div>Not found</div>,
  },
];
