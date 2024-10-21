import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const DeprecateRoute: RouteObject[] = [
  {
    path: "deprecates",
    children: [
      {
        path: "",
        element: asyncLayout(
          () => import("@modules/deprecate/pages/DeprecatesListPage")
        ),
      },
      {
        path: "create",
        element: asyncLayout(
          () => import("@modules/deprecate/pages/CreateDeprecatePage")
        ),
      },
    ],
  },
];
