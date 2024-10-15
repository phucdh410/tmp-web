import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const HandoverOfAssetRoute: RouteObject[] = [
  {
    path: "handover-of-asset",
    children: [
      {
        path: "list",
        element: asyncLayout(
          () =>
            import("@modules/handover-of-asset/pages/HandoverOfAssetsListPage")
        ),
      },
      {
        path: "create",
        element: asyncLayout(
          () =>
            import("@modules/handover-of-asset/pages/CreateHandoverOfAssetPage")
        ),
      },
    ],
  },
];
