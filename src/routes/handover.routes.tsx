import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const HandoverRoute: RouteObject[] = [
  {
    path: "handover",
    children: [
      {
        path: "list",
        element: asyncLayout(
          () => import("@modules/handover/pages/HandoversListPage")
        ),
      },
      {
        path: "create",
        element: asyncLayout(
          () => import("@modules/handover/pages/CreateHandoverPage")
        ),
      },
      {
        path: "update/:id",
        element: asyncLayout(
          () => import("@modules/handover/pages/UpdateHandoverPage")
        ),
      },
      {
        path: "detail/:id",
        element: asyncLayout(
          () => import("@modules/handover/pages/DetailHandoverPage")
        ),
      },
    ],
  },
];
