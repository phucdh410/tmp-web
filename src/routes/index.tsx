import { Outlet, RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";
import { CErrorPage, CNotFoundPage } from "@others";

import { AssetRoute } from "./asset.routes";
import { CategoryRoute } from "./category.routes";
import { authLoader } from "./loader";
import { PaymentProposalRoute } from "./payment-proposal.routes";
import { PurchaseProposalNQuoteRoute } from "./purchase-proposal-n-quote.routes";
import { RoomRoute } from "./room.routes";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Outlet />,
    errorElement: <CErrorPage />,
    children: [
      {
        path: "/",
        loader: () => authLoader("main"),
        element: asyncLayout(
          () => import("@components/layouts/CMainLayout"),
          false,
          "layout"
        ),
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
              () => import("@modules/dashboard/pages/DashboardPage")
            ),
          },
          {
            path: "de-xuat-cap-phat",
            element: asyncLayout(
              () => import("@modules/dashboard/pages/DashboardPage"),
              true
            ),
          },
          ...PurchaseProposalNQuoteRoute,
          ...PaymentProposalRoute,
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
          ...RoomRoute,
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
