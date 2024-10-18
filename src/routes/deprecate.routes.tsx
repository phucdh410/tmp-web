import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const DeprecateRoute: RouteObject[] = [
  {
    path: "deprecates",
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
