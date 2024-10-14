import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const PaymentProposalRoute: RouteObject[] = [
  {
    path: "payment-proposal",
    children: [
      {
        path: "list",
        element: asyncLayout(
          () =>
            import("@modules/payment-proposal/pages/PaymentProposalsListPage")
        ),
      },
    ],
  },
];
