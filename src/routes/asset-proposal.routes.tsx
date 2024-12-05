import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const AssetProposalRoute: RouteObject[] = [
  {
    path: "asset-proposals",
    children: [
      {
        path: "",
        element: asyncLayout(
          () => import("@modules/asset-proposal/pages/AssetProposalsListPage")
        ),
      },
      {
        path: "detail/:id",
        element: asyncLayout(
          () => import("@modules/asset-proposal/pages/AssetProposalsListPage"),
          true
        ),
      },
    ],
  },
];
