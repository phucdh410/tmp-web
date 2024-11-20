import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const AcceptanceRoute: RouteObject[] = [
  {
    path: "acceptances",
    children: [
      {
        path: "",
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
      {
        path: "update/:id",
        element: asyncLayout(
          () => import("@modules/acceptance/pages/UpdateAcceptancePage")
        ),
      },
      {
        path: "detail/:id",
        element: asyncLayout(
          () => import("@modules/acceptance/pages/DetailAcceptancePage")
        ),
      },
    ],
  },
];
