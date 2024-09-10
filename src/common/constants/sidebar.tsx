import { ISidebarItem } from "@interfaces/sidebar";
import {
  AccountTree,
  AddTask,
  Assessment,
  Home,
  Inventory,
  ManageAccounts,
  Paid,
} from "@mui/icons-material";

export const SIDEBAR: ISidebarItem[] = [
  {
    label: "Dashboard",
    icon: <Home />,
    path: "dashboard",
    children: [],
  },
  {
    label: "Đề xuất cấp phát",
    icon: <AddTask />,
    path: "de-xuat-cap-phat",
    children: [],
  },
  {
    label: "Đề xuất mua/báo giá",
    icon: <Paid />,
    path: "de-xuat-mua-bao-gia",
    children: [],
  },
  {
    label: "Danh mục tài sản",
    icon: <Inventory />,
    path: "asset",
    children: [
      { label: "Danh sách phiếu ghi tăng", path: "receipts" },
      { label: "Danh sách tài sản & CCDC", path: "assets-n-tools" },
      // { label: "Thêm phiếu ghi tăng", path: "receipts/create" },
    ],
  },
  {
    label: "Phân quyền",
    icon: <ManageAccounts />,
    path: "phan-quyen",
    children: [],
  },
  {
    label: "Báo cáo",
    icon: <Assessment />,
    path: "bao-cao",
    children: [],
  },
  {
    label: "Danh mục",
    icon: <AccountTree />,
    path: "category",
    children: [
      {
        label: "Danh sách khu vực",
        path: "places",
      },
      {
        label: "Danh sách vị trí",
        path: "positions",
      },
      {
        label: "Danh sách đề xuất nhóm phòng",
        path: "room-group-suggests",
      },
      {
        label: "Danh sách phòng",
        path: "rooms",
      },
      {
        label: "Danh sách giá phòng",
        path: "room-prices",
      },
      {
        label: "Quản lý tiện ích",
        path: "utilities",
      },
    ],
  },
];
