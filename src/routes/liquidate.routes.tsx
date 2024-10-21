import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const LiquidateRoute: RouteObject[] = [
  {
    path: "liquidates",
    children: [
      {
        path: "",
        element: asyncLayout(
          () => import("@modules/liquidate/pages/LiquidatesListPage")
        ),
      },
      {
        path: "create",
        element: asyncLayout(
          () => import("@modules/liquidate/pages/CreateLiquidatePage")
        ),
      },
    ],
  },
];
