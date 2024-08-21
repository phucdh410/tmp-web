import { Outlet, RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";
import { CErrorPage } from "@others";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Outlet />,
    errorElement: <CErrorPage />,
    children: [
      {
        path: "/login",
        element: asyncLayout(() => import("@components/layouts/CLoginLayout")),
        children: [
          {
            path: "",
            element: asyncLayout(() => import("@modules/auth/pages/LoginPage")),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div>Not found</div>,
  },
];
