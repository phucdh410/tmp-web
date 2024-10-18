import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const RecoveryRoute: RouteObject[] = [
  {
    path: "recoveries",
    children: [
      {
        path: "",
        element: asyncLayout(
          () => import("@modules/recovery/pages/RecoveriesListPage")
        ),
      },
      {
        path: "create",
        element: asyncLayout(
          () => import("@modules/recovery/pages/CreateRecoveryPage")
        ),
      },
    ],
  },
];
