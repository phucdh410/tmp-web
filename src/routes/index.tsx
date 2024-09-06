import { Outlet, RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";
import { CErrorPage, CNotFoundPage } from "@others";

import { AssetRoute } from "./asset.routes";
import { CategoryRoute } from "./category.routes";
import { authLoader } from "./loader";

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
          {
            path: "dashboard",
            element: asyncLayout(
              () => import("@modules/dashboard/pages/TestPage")
            ),
          },
          {
            path: "de-xuat-cap-phat",
            element: asyncLayout(
              () => import("@modules/dashboard/pages/DashboardPage"),
              true
            ),
          },
          {
            path: "de-xuat-mua-bao-gia",
            element: asyncLayout(
              () => import("@modules/dashboard/pages/DashboardPage"),
              true
            ),
          },
          {
            path: "phan-quyen",
            element: asyncLayout(
              () => import("@modules/dashboard/pages/DashboardPage"),
              true
            ),
          },
          {
            path: "bao-cao",
            element: asyncLayout(
              () => import("@modules/dashboard/pages/DashboardPage"),
              true
            ),
          },
          ...AssetRoute,
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
    element: <CNotFoundPage />,
  },
];
