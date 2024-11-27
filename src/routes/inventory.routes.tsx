import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const InventoryRoute: RouteObject[] = [
  {
    path: "inventories",
    children: [
      {
        path: "",
        element: asyncLayout(
          () => import("@modules/inventory/pages/InventoryChecksListPage")
        ),
      },
      {
        path: "create",
        element: asyncLayout(
          () => import("@modules/inventory/pages/CreateInventoryPage")
        ),
      },
      {
        path: "update/:id",
        element: asyncLayout(
          () => import("@modules/inventory/pages/UpdateInventoryPage")
        ),
      },
    ],
  },
];
