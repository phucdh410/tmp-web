import { ISidebarItem } from "@interfaces/sidebar";
import {
  AccountTree,
  AddTask,
  Assessment,
  Home,
  ManageAccounts,
  Paid,
  TipsAndUpdatesOutlined,
  Tune,
} from "@mui/icons-material";
import { CFontAwesomeWrapper } from "@others";

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
    path: "purchase-proposal-n-quote",
    children: [{ label: "DS Phiếu đề xuất mua tài sản", path: "list" }],
  },
  {
    label: "Đề xuất thanh toán",
    icon: <TipsAndUpdatesOutlined />,
    path: "payment-proposal",
    children: [{ label: "DS Phiếu đề xuất thanh toán", path: "list" }],
  },
  {
    label: "Bàn giao tài sản",
    icon: (
      <CFontAwesomeWrapper
        icon={<i className="fa-regular fa-handshake fa-lg"></i>}
      />
    ),
    path: "handover-of-asset",
    children: [{ label: "DS Phiếu bàn giao tài sản", path: "list" }],
  },
  {
    label: "Nghiệm thu",
    icon: (
      <CFontAwesomeWrapper
        icon={<i className="fa-regular fa-money-check-dollar-pen fa-lg"></i>}
      />
    ),
    path: "acceptance",
    children: [{ label: "DS Phiếu nghiệm thu", path: "list" }],
  },
  {
    label: "Danh mục tài sản",
    icon: (
      <CFontAwesomeWrapper icon={<i className="fa-regular fa-box fa-xl"></i>} />
    ),
    path: "asset",
    children: [
      { label: "Danh sách phiếu ghi tăng", path: "receipts" },
      { label: "Danh sách tài sản & CCDC", path: "assets-n-tools" },
      // { label: "Thêm phiếu ghi tăng", path: "receipts/create" },
    ],
  },
  {
    label: "Danh mục hệ thống",
    icon: <Tune />,
    path: "category",
    children: [
      { label: "Quản lý chi nhánh", path: "stores" },
      { label: "Quản lý khu vực", path: "places" },
      { label: "Quản lý vị trí", path: "regions" },
      { label: "Quản lý nhà cung cấp", path: "vendors" },
      { label: "Quản lý loại CCDC", path: "categories" },
    ],
  },
  {
    label: "Danh sách phiếu",
    icon: (
      <CFontAwesomeWrapper
        icon={<i className="fa-sharp fa-regular fa-file-invoice fa-xl"></i>}
      />
    ),
    path: "paper",
    children: [
      { label: "Phiếu luân chuyển", path: "transfers" },
      { label: "Phiếu thanh lý", path: "liquidates" },
      { label: "Phiếu khấu hao", path: "deprecates" },
      { label: "Phiếu thu hồi", path: "recoveries" },
      { label: "Phiếu ghi giảm", path: "issues" },
      { label: "Phiếu kiểm kê", path: "inventories" },
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
    label: "Danh mục phòng",
    icon: <AccountTree />,
    path: "room",
    children: [
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
