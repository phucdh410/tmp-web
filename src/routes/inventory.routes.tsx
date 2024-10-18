import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const InventoryRoute: RouteObject[] = [
  {
    path: "inventories",
    children: [
      {
        path: "",
        element: asyncLayout(
          () => import("@modules/transfer/pages/TransfersListPage"),
          true
        ),
      },
      {
        path: "create",
        element: asyncLayout(
          () => import("@modules/transfer/pages/CreateTransferPage"),
          true
        ),
      },
    ],
  },
];
