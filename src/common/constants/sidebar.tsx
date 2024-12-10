import { ISidebarItem } from "@interfaces/sidebar";
import {
  AccountTree,
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
  // {
  //   label: "Đề xuất cấp phát",
  //   icon: <AddTask />,
  //   path: "de-xuat-cap-phat",
  //   children: [],
  // },
  {
    label: "Đề xuất tài sản",
    icon: <Paid />,
    path: "asset-proposals",
    children: [
      { label: "DS Phiếu đề xuất tài sản", path: "ballots" },
      { label: "DS tài sản đề xuất mua", path: "assets" },
    ],
  },
  {
    label: "Bàn giao tài sản",
    icon: (
      <CFontAwesomeWrapper
        icon={<i className="fa-regular fa-handshake fa-lg"></i>}
      />
    ),
    path: "handovers",
    children: [{ label: "DS Phiếu bàn giao tài sản", path: "" }],
  },
  {
    label: "Nghiệm thu",
    icon: (
      <CFontAwesomeWrapper
        icon={<i className="fa-regular fa-money-check-dollar-pen fa-lg"></i>}
      />
    ),
    path: "acceptances",
    children: [{ label: "DS Phiếu nghiệm thu", path: "" }],
  },
  {
    label: "Đề xuất thanh toán",
    icon: <TipsAndUpdatesOutlined />,
    path: "payment-proposals",
    children: [{ label: "DS Phiếu đề xuất thanh toán", path: "" }],
  },
  {
    label: "Nhập tài sản",
    icon: (
      <CFontAwesomeWrapper
        icon={<i className="fa-regular fa-file-import fa-lg"></i>}
      />
    ),
    path: "import-assets",
    children: [{ label: "DS Phiếu nhập tài sản", path: "" }],
  },
  {
    label: "Xuất tài sản",
    icon: (
      <CFontAwesomeWrapper
        icon={<i className="fa-regular fa-file-export fa-lg"></i>}
      />
    ),
    path: "export-assets",
    children: [{ label: "DS Phiếu xuất tài sản", path: "" }],
  },
  {
    label: "Bán tài sản",
    icon: (
      <CFontAwesomeWrapper
        icon={<i className="fa-sharp fa-regular fa-coins fa-lg"></i>}
      />
    ),
    path: "sell-assets",
    children: [{ label: "DS Phiếu bán tài sản", path: "" }],
  },
  {
    label: "Danh mục tài sản",
    icon: (
      <CFontAwesomeWrapper icon={<i className="fa-regular fa-box fa-xl"></i>} />
    ),
    path: "assets",
    children: [
      { label: "Danh sách phiếu ghi tăng", path: "receipts" },
      { label: "Danh sách tài sản & CCDC", path: "assets-n-tools" },
      { label: "Định giá tài sản", path: "asset-valuations" },
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
    path: "permission",
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
      // {
      //   label: "Danh sách giá phòng",
      //   path: "room-prices",
      // },
      {
        label: "Quản lý tiện ích",
        path: "utilities",
      },
    ],
  },
];
