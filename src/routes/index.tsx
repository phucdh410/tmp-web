import { Outlet, RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";
import { CErrorPage } from "@others";

import { authLoader } from "./auth.loader";
import { CategoryRoute } from "./category.routes";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Outlet />,
    errorElement: <CErrorPage />,
    children: [
      {
        path: "/",
        loader: () => authLoader("main"),
        element: asyncLayout(() => import("@components/layouts/CMainLayout")),
        children: [
          {
            path: "/",
            element: asyncLayout(
              () => import("@modules/dashboard/pages/DashboardPage")
            ),
          },
          ...CategoryRoute,
        ],
      },
      {
        path: "/login",
        loader: () => authLoader("login"),
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
