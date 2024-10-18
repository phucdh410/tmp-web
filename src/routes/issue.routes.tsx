import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const IssueRoute: RouteObject[] = [
  {
    path: "issues",
    children: [
      {
        path: "",
        element: asyncLayout(
          () => import("@modules/issue/pages/IssuesListPage")
        ),
      },
      {
        path: "create",
        element: asyncLayout(
          () => import("@modules/issue/pages/CreateIssuePage")
        ),
      },
    ],
  },
];
