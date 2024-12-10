import { Outlet, RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";
import { CErrorPage, CNotFoundPage } from "@others";

import { AcceptanceRoute } from "./acceptance.routes";
import { AssetRoute } from "./asset.routes";
import { AssetProposalRoute } from "./asset-proposal.routes";
import { CategoryRoute } from "./category.routes";
import { DeprecateRoute } from "./deprecate.routes";
import { ExportAssetRoute } from "./export-asset.routes";
import { HandoverRoute } from "./handover.routes";
import { ImportAssetRoute } from "./import-asset.routes";
import { InventoryRoute } from "./inventory.routes";
import { IssueRoute } from "./issue.routes";
import { LiquidateRoute } from "./liquidate.routes";
import { authLoader } from "./loader";
import { PaymentProposalRoute } from "./payment-proposal.routes";
import { PermissionRoute } from "./permission.routes";
import { RecoveryRoute } from "./recovery.routes";
import { RoomRoute } from "./room.routes";
import { SellAssetRoute } from "./sell-asset.routes";
import { TransferRoute } from "./transfer.routes";

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
          {
            path: "paper",
            children: [
              ...TransferRoute,
              ...IssueRoute,
              ...RecoveryRoute,
              ...LiquidateRoute,
              ...DeprecateRoute,
              ...InventoryRoute,
            ],
          },
          ...ImportAssetRoute,
          ...ExportAssetRoute,
          ...SellAssetRoute,
          ...AssetProposalRoute,
          ...PaymentProposalRoute,
          ...HandoverRoute,
          ...AcceptanceRoute,
          ...AssetRoute,
          ...CategoryRoute,
          ...PermissionRoute,
          ...RoomRoute,
          {
            path: "/test",
            element: asyncLayout(() => import("@modules/test/pages/MTestPage")),
          },
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
