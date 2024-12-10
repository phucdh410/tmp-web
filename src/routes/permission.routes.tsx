import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const PermissionRoute: RouteObject[] = [
  {
    path: "permission",
    children: [
      {
        path: "",
        element: asyncLayout(
          () => import("@modules/permission/pages/PermissionConfigPage")
        ),
      },
    ],
  },
];
