import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const SellAssetRoute: RouteObject[] = [
  {
    path: "sell-asset",
    children: [
      {
        path: "list",
        element: asyncLayout(
          () => import("@modules/sell-asset/pages/SellAssetsListPage")
        ),
      },
      {
        path: "create",
        element: asyncLayout(
          () => import("@modules/sell-asset/pages/CreateSellAssetPage")
        ),
      },
      {
        path: "update/:id",
        element: asyncLayout(
          // () => import("@modules/sell-asset/pages/UpdateSellAssetPage")
          () => import("@modules/sell-asset/pages/SellAssetsListPage"),
          true
        ),
      },
      // {
      //   path: "detail/:id",
      //   element: asyncLayout(
      //     () => import("@modules/sell-asset/pages/DetailImportAssetPage")
      //   ),
      // },
    ],
  },
];
