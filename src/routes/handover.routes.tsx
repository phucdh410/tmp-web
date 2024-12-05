import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const HandoverRoute: RouteObject[] = [
  {
    path: "handovers",
    children: [
      {
        path: "",
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
      {
        path: "approve/:id",
        element: asyncLayout(
          () => import("@modules/handover/pages/ApproveHandoverPage")
        ),
      },
    ],
  },
];
