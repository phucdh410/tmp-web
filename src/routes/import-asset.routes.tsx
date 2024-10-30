import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const ImportAssetRoute: RouteObject[] = [
  {
    path: "import-asset",
    children: [
      {
        path: "list",
        element: asyncLayout(
          () => import("@modules/import-asset/pages/ImportAssetsListPage")
        ),
      },
      {
        path: "create",
        element: asyncLayout(
          () => import("@modules/import-asset/pages/CreateImportAssetPage")
        ),
      },
      {
        path: "update/:id",
        element: asyncLayout(
          () => import("@modules/import-asset/pages/UpdateImportAssetPage")
        ),
      },
      // {
      //   path: "detail/:id",
      //   element: asyncLayout(
      //     () => import("@modules/import-asset/pages/DetailImportAssetPage")
      //   ),
      // },
    ],
  },
];
