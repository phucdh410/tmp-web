import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const AcceptanceRoute: RouteObject[] = [
  {
    path: "acceptance",
    children: [
      {
        path: "list",
        element: asyncLayout(
          () => import("@modules/acceptance/pages/AcceptancesListPage")
        ),
      },
      {
        path: "create",
        element: asyncLayout(
          () => import("@modules/acceptance/pages/CreateAcceptancePage")
        ),
      },
    ],
  },
];
