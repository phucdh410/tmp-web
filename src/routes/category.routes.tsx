import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const CategoryRoute: RouteObject[] = [
  {
    path: "/category",
    children: [
      {
        path: "/category/places",
        element: asyncLayout(
          () => import("@modules/place/pages/PlaceManagementPage")
        ),
      },
      {
        path: "/category/utilities",
        element: asyncLayout(
          () => import("@modules/utility/pages/UtilityManagementPage")
        ),
      },
    ],
  },
];
