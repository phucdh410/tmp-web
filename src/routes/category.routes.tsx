import { RouteObject } from "react-router-dom";

import { asyncLayout } from "@funcs/route";

export const CategoryRoute: RouteObject[] = [
  {
    path: "category",
    children: [
      {
        path: "stores",
        element: asyncLayout(
          () => import("@modules/store/pages/StoresManagementPage")
        ),
      },
      {
        path: "places",
        element: asyncLayout(
          () => import("@modules/place/pages/PlacesManagementPage")
        ),
      },
      {
        path: "regions",
        element: asyncLayout(
          () => import("@modules/region/pages/RegionsManagementPage")
        ),
      },
      {
        path: "vendors",
        element: asyncLayout(
          () => import("@modules/vendor/pages/VendorsManagementPage")
        ),
      },
      {
        path: "categories",
        element: asyncLayout(
          () => import("@modules/category/pages/CategoriesManagementPage")
        ),
      },
    ],
  },
];
