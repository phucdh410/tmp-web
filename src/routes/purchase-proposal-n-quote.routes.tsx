import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const PurchaseProposalNQuoteRoute: RouteObject[] = [
  {
    path: "purchase-proposal-n-quote",
    children: [
      {
        path: "list",
        element: asyncLayout(
          () =>
            import(
              "@modules/purchase-proposal-n-quote/pages/PurchaseProposalNQuoteListPage"
            )
        ),
      },
      {
        path: "list/detail/:id",
        element: asyncLayout(
          () =>
            import(
              "@modules/purchase-proposal-n-quote/pages/DetailPurchaseProposalNQuotePage"
            )
        ),
      },
    ],
  },
];
