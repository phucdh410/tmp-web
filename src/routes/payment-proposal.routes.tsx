import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const PaymentProposalRoute: RouteObject[] = [
  {
    path: "payment-proposals",
    children: [
      {
        path: "",
        element: asyncLayout(
          () =>
            import("@modules/payment-proposal/pages/PaymentProposalsListPage")
        ),
      },
      {
        path: "create",
        element: asyncLayout(
          () =>
            import("@modules/payment-proposal/pages/CreatePaymentProposalPage")
        ),
      },
      {
        path: "update/:id",
        element: asyncLayout(
          () =>
            import("@modules/payment-proposal/pages/UpdatePaymentProposalPage")
        ),
      },
      {
        path: "detail/:id",
        element: asyncLayout(
          () =>
            import("@modules/payment-proposal/pages/DetailPaymentProposalPage")
        ),
      },
    ],
  },
];
