import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const AssetProposalRoute: RouteObject[] = [
  {
    path: "asset-proposals",
    children: [
      {
        path: "ballots",
        element: asyncLayout(
          () => import("@modules/asset-proposal/pages/AssetProposalsListPage")
        ),
      },
      {
        path: "ballots/detail/:id",
        element: asyncLayout(
          () => import("@modules/asset-proposal/pages/AssetProposalDetailPage")
        ),
      },
      {
        path: "assets",
        element: asyncLayout(
          () =>
            import(
              "@modules/purchased-proposed-asset/pages/PurchasedPrososedAssetsListPage"
            )
        ),
      },
    ],
  },
];
