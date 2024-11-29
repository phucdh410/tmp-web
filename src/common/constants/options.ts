import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";

import {
  ACCEPTANCE_STATUSES,
  ASSET_VALUATION_STATUES,
  ASSET_VALUATION_TYPES,
  CODE_TYPES,
  EXPORT_ASSET_STATUES,
  HANDOVER_STATUSES,
  IMPORT_ASSET_STATUES,
  IMPORT_ASSET_TYPES,
  PAYMENT_PHASES,
  PAYMENT_PROPOSAL_STATUSES,
  PURCHASE_PROPOSAL_N_QUOTE_STATUSES,
  ROOM_GROUP_SUGGEST_STATUSES,
  SELL_ASSET_STATUES,
  STOCKTAKE_QUALITIES,
  STOCKTAKE_STATUES,
  TRANSFER_TYPES,
  WARRANTY_LEVELS,
} from "./enums";

export const STATUS_OPTIONS: IAutocompleteOption[] = [
  { id: 1, label: "Hoạt động" },
  { id: 0, label: "Ngưng" },
];

export const PAGE_SIZE = [
  { value: 10, label: "10/trang" },
  { value: 20, label: "20/trang" },
  { value: 50, label: "50/trang" },
];

export const APPROVAL_STATUS_OPTIONS = [
  { id: 1, label: "Tạo mới" },
  { id: 2, label: "Duyệt" },
  { id: -1, label: "Không duyệt" },
];

export const DAYS_OF_WEEK_OPTIONS = [
  { id: 1, label: "2" },
  { id: 2, label: "3" },
  { id: 3, label: "4" },
  { id: 4, label: "5" },
  { id: 5, label: "6" },
  { id: 6, label: "7" },
  { id: 7, label: "CN" },
];

export const TIMES_IN_DAY_OPTIONS = [
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 3, label: "3" },
  { id: 4, label: "4" },
  { id: 5, label: "5" },
  { id: 6, label: "6" },
  { id: 7, label: "7" },
  { id: 8, label: "8" },
  { id: 9, label: "9" },
  { id: 10, label: "10" },
  { id: 11, label: "11" },
  { id: 12, label: "12" },
  { id: 13, label: "13" },
  { id: 14, label: "14" },
  { id: 15, label: "15" },
  { id: 16, label: "16" },
  { id: 17, label: "17" },
  { id: 18, label: "18" },
  { id: 19, label: "19" },
  { id: 20, label: "20" },
  { id: 21, label: "21" },
  { id: 22, label: "22" },
  { id: 23, label: "23" },
  { id: 24, label: "24" },
];

export const CODE_TYPES_OPTIONS = [
  { id: CODE_TYPES.QR_CODE, label: "QR Code" },
  { id: CODE_TYPES.BARCODE, label: "Barcode" },
];

export const WARRANTY_LEVELS_OPTIONS = [
  { id: WARRANTY_LEVELS.DAY, label: "Ngày" },
  { id: WARRANTY_LEVELS.MONTH, label: "Tháng" },
  { id: WARRANTY_LEVELS.YEAR, label: "Năm" },
];

export const ROOM_GROUP_SUGGEST_STATUSES_OPTIONS = [
  { id: ROOM_GROUP_SUGGEST_STATUSES.INIT, label: "Tạo mới", color: "#B78911" },
  {
    id: ROOM_GROUP_SUGGEST_STATUSES.APPROVED,
    label: "Duyệt",
    color: "#11B785",
  },
  {
    id: ROOM_GROUP_SUGGEST_STATUSES.DENIED,
    label: "Không duyệt",
    color: "#d32f2f",
  },
];

export const PURCHASE_PROPOSAL_N_QUOTE_STATUSES_OPTIONS = [
  {
    id: PURCHASE_PROPOSAL_N_QUOTE_STATUSES.PENDING,
    label: "Đang xử lý",
    color: "#B78911",
  },
  {
    id: PURCHASE_PROPOSAL_N_QUOTE_STATUSES.NEW,
    label: "Mới tạo",
    color: "#d32f2f",
  },
  {
    id: PURCHASE_PROPOSAL_N_QUOTE_STATUSES.DONE,
    label: "Hoàn thành",
    color: "#11B785",
  },
];

export const PAYMENT_PROPOSAL_STATUSES_OPTIONS = [
  { id: PAYMENT_PROPOSAL_STATUSES.SUGGEST, label: "Đề xuất", color: "#B78911" },
  {
    id: PAYMENT_PROPOSAL_STATUSES.APPROVED,
    label: "Xác nhận",
    color: "#11B785",
  },
  {
    id: PAYMENT_PROPOSAL_STATUSES.DENIED,
    label: "Không xác nhận",
    color: "#d32f2f",
  },
];

export const PAYMENT_PHASES_OPTIONS = [
  { id: PAYMENT_PHASES.SUGGEST, label: "Đề xuất thanh toán" },
  { id: PAYMENT_PHASES.ACCOUNTANT, label: "Kế toán thanh toán" },
  { id: PAYMENT_PHASES.FINANCE_DIRECTOR, label: "Giám đốc tài chính" },
  { id: PAYMENT_PHASES.GENERAL_DIRECTOR, label: "Tổng giám đốc" },
  { id: PAYMENT_PHASES.TREASURER, label: "Thủ quỹ thanh toán" },
];

export const ACCEPTANCE_STATUSES_OPTIONS = [
  {
    id: ACCEPTANCE_STATUSES.SUGGEST,
    label: "Đề xuất",
    color: "#B78911",
  },
  { id: ACCEPTANCE_STATUSES.ACCEPTANCE, label: "Nghiệm thu", color: "#11B785" },
];

export const TRANSFER_TYPES_OPTIONS = [
  { id: TRANSFER_TYPES.INSIDE, label: "Luân chuyển nội bộ" },
  { id: TRANSFER_TYPES.OUTSIDE, label: "Luân chuyển chi nhánh khác" },
];

export const HANDOVER_STATUSES_OPTIONS = [
  { id: HANDOVER_STATUSES.INIT, label: "Mới tạo", color: "#B78911" },
  { id: HANDOVER_STATUSES.DONE, label: "Hoàn thành", color: "#11B785" },
  { id: HANDOVER_STATUSES.REJECT, label: "Từ chối", color: "#d32f2f" },
];

export const IMPORT_ASSET_TYPES_OPTIONS = [
  { id: IMPORT_ASSET_TYPES.BUY_NEW, label: "Mua mới" },
  { id: IMPORT_ASSET_TYPES.RECALL, label: "Thu hồi về kho" },
];

export const IMPORT_ASSET_STATUES_OPTIONS = [
  { id: IMPORT_ASSET_STATUES.NEW, label: "Tạo mới", color: "#053C7F" },
  { id: IMPORT_ASSET_STATUES.STORED, label: "Đã lưu kho", color: "#00B83E" },
];

export const EXPORT_ASSET_STATUES_OPTIONS = [
  { id: EXPORT_ASSET_STATUES.NEW, label: "Mới tạo", color: "#B72511" },
  { id: EXPORT_ASSET_STATUES.PENDING, label: "Đang xử lý", color: "#EE9D00" },
  { id: EXPORT_ASSET_STATUES.DONE, label: "Hoàn thành", color: "#11B785" },
];

export const SELL_ASSET_STATUES_OPTIONS = [
  { id: SELL_ASSET_STATUES.NEW, label: "Mới tạo", color: "#B72511" },
  { id: SELL_ASSET_STATUES.PENDING, label: "Đang xử lý", color: "#EE9D00" },
  { id: SELL_ASSET_STATUES.DONE, label: "Hoàn thành", color: "#11B785" },
];

export const ASSET_VALUATION_STATUES_OPTIONS = [
  { id: ASSET_VALUATION_STATUES.NEW, label: "Mới tạo", color: "#B72511" },
  {
    id: ASSET_VALUATION_STATUES.PENDING,
    label: "Đang xử lý",
    color: "#EE9D00",
  },
  { id: ASSET_VALUATION_STATUES.DONE, label: "Hoàn thành", color: "#11B785" },
];

export const ASSET_VALUATION_TYPES_OPTIONS = [
  {
    id: ASSET_VALUATION_TYPES.REMAINING_DEPRECIATION,
    value: ASSET_VALUATION_TYPES.REMAINING_DEPRECIATION,
    label: "Còn khấu hao",
  },
  {
    id: ASSET_VALUATION_TYPES.FULLY_DEPRECIATED,
    value: ASSET_VALUATION_TYPES.FULLY_DEPRECIATED,
    label: "Hết khấu hao",
  },
];

export const STOCKTAKE_STATUES_OPTIONS = [
  {
    id: STOCKTAKE_STATUES.NOT_YET,
    label: "Chưa xác nhận",
    color: "#B72511",
  },
  {
    id: STOCKTAKE_STATUES.DONE,
    label: "Hoàn thành",
    color: "#11B785",
  },
];

export const STOCKTAKE_QUALITIES_OPTIONS = [
  {
    id: STOCKTAKE_QUALITIES.WELL,
    label: "Hoạt động tốt",
  },
  {
    id: STOCKTAKE_QUALITIES.DAMAGED,
    label: "Bị hỏng",
  },
  {
    id: STOCKTAKE_QUALITIES.MAINTENANCE,
    label: "Đi bảo trì",
  },
];
