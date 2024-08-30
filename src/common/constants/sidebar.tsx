import { ISidebarItem } from "@interfaces/sidebar";
import { Home, List, TextSnippet } from "@mui/icons-material";

export const SIDEBAR: ISidebarItem[] = [
  {
    label: "Dashboard",
    icon: <Home />,
    path: "dashboard",
    children: [],
  },
  {
    label: "Danh sách tài sản",
    icon: <List />,
    path: "assets",
    children: [],
  },
  {
    label: "Đề xuất cấp phát",
    icon: <TextSnippet />,
    path: "de-xuat-cap-phat",
    children: [],
  },
  {
    label: "Đề xuất mua/báo giá",
    icon: <TextSnippet />,
    path: "de-xuat-mua-bao-gia",
    children: [],
  },
  {
    label: "Nhập tài sản",
    icon: <TextSnippet />,
    path: "nhap-tai-san",
    children: [],
  },
  {
    label: "Xuất tài sản",
    icon: <TextSnippet />,
    path: "xuat-tai-san",
    children: [],
  },
  {
    label: "Danh mục tài sản",
    icon: <TextSnippet />,
    path: "danh-muc-tai-san",
    children: [],
  },
  {
    label: "Phân quyền",
    icon: <TextSnippet />,
    path: "phan-quyen",
    children: [],
  },
  {
    label: "Báo cáo",
    icon: <TextSnippet />,
    path: "bao-cao",
    children: [],
  },
  {
    label: "Danh mục",
    icon: <TextSnippet />,
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
