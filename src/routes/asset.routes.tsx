import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const AssetRoute: RouteObject[] = [
  {
    path: "assets",
    element: asyncLayout(
      () => import("@modules/asset/pages/AssetManagementPage")
    ),
  },
];
