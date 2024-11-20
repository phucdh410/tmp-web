import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const AssetRoute: RouteObject[] = [
  {
    path: "asset",
    children: [
      {
        path: "receipts",
        children: [
          {
            path: "",
            element: asyncLayout(
              () => import("@modules/receipt/pages/ReceiptsListPage")
            ),
          },
          {
            path: "create",
            element: asyncLayout(
              () => import("@modules/receipt/pages/CreateReceiptPage")
            ),
          },
          {
            path: "update/:id",
            element: asyncLayout(
              () => import("@modules/receipt/pages/UpdateReceiptPage")
            ),
          },
        ],
      },
      {
        path: "assets-n-tools",
        element: asyncLayout(
          () => import("@modules/asset/pages/AssetsManagementPage")
        ),
      },
      {
        path: "asset-valuations",
        children: [
          {
            path: "",
            element: asyncLayout(
              () =>
                import("@modules/asset-valuation/pages/AssetValuationsListPage")
            ),
          },
          {
            path: "create",
            element: asyncLayout(
              () =>
                import(
                  "@modules/asset-valuation/pages/CreateAssetValuationPage"
                ),
              true
            ),
          },
        ],
      },
    ],
  },
];
