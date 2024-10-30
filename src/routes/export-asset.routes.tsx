import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const ExportAssetRoute: RouteObject[] = [
  {
    path: "export-asset",
    children: [
      {
        path: "list",
        element: asyncLayout(
          () => import("@modules/import-asset/pages/ImportAssetsListPage"),
          true
        ),
      },
      {
        path: "create",
        element: asyncLayout(
          () => import("@modules/import-asset/pages/CreateImportAssetPage"),
          true
        ),
      },
      {
        path: "update/:id",
        element: asyncLayout(
          () => import("@modules/import-asset/pages/UpdateImportAssetPage"),
          true
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
