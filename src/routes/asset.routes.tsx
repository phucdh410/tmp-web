import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const AssetRoute: RouteObject[] = [
  {
    path: "asset",
    children: [
      {
        path: "receipts",
        element: asyncLayout(
          () => import("@modules/asset/pages/AssetManagementPage"),
          true
        ),
      },
      {
        path: "assets-n-tools",
        element: asyncLayout(
          () => import("@modules/asset/pages/AssetManagementPage"),
          true
        ),
      },
      {
        path: "receipts/create",
        element: asyncLayout(
          () => import("@modules/asset/pages/AssetManagementPage"),
          true
        ),
      },
    ],
  },
];
