import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const CategoryRoute: RouteObject[] = [
  {
    path: "category",
    children: [
      {
        path: "places",
        element: asyncLayout(
          () => import("@modules/place/pages/PlaceManagementPage")
        ),
      },
      {
        path: "positions",
        element: asyncLayout(
          () => import("@modules/position/pages/PositionManagementPage")
        ),
      },
      {
        path: "utilities",
        element: asyncLayout(
          () => import("@modules/utility/pages/UtilityManagementPage")
        ),
      },
      {
        path: "room-group-suggests",
        element: asyncLayout(
          () =>
            import(
              "@modules/room-group-suggest/pages/RoomGroupSuggestManagement"
            )
        ),
      },
    ],
  },
];
