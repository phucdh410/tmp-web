import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const TransferRoute: RouteObject[] = [
  {
    path: "transfers",
    children: [
      {
        path: "",
        element: asyncLayout(
          () => import("@modules/transfer/pages/TransfersListPage")
        ),
      },
      {
        path: "create",
        element: asyncLayout(
          () => import("@modules/transfer/pages/CreateTransferPage")
        ),
      },
      {
        path: "update/:id",
        element: asyncLayout(
          () => import("@modules/transfer/pages/UpdateTransferPage")
        ),
      },
    ],
  },
];
