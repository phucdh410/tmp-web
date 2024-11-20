import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const ExportAssetRoute: RouteObject[] = [
  {
    path: "export-assets",
    children: [
      {
        path: "",
        element: asyncLayout(
          () => import("@modules/export-asset/pages/ExportAssetsListPage")
        ),
      },
      {
        path: "create",
        element: asyncLayout(
          () => import("@modules/export-asset/pages/CreateExportAssetPage")
        ),
      },
      {
        path: "update/:id",
        element: asyncLayout(
          () => import("@modules/export-asset/pages/UpdateExportAssetPage")
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
