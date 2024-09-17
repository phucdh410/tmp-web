import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const RoomRoute: RouteObject[] = [
  {
    path: "room",
    children: [
      {
        path: "utilities",
        element: asyncLayout(
          () => import("@modules/utility/pages/UtilityManagementPage")
        ),
      },
      {
        path: "rooms",
        element: asyncLayout(
          () => import("@modules/room/pages/RoomManagementPage")
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
      {
        path: "room-group-suggests/create",
        element: asyncLayout(
          () =>
            import("@modules/room-group-suggest/pages/CreateRoomGroupSuggest")
        ),
      },
    ],
  },
];
