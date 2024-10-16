import { IAutocompleteOption } from "@components/controls/CAutocomplete/types";

import {
  ACCEPTANCE_STATUSES,
  CODE_TYPES,
  PAYMENT_PHASES,
  PAYMENT_PROPOSAL_STATUSES,
  PURCHASE_PROPOSAL_N_QUOTE_STATUSES,
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

export const PURCHASE_PROPOSAL_N_QUOTE_STATUSES_OPTIONS = [
  { id: PURCHASE_PROPOSAL_N_QUOTE_STATUSES.PENDING, label: "Đang xử lý" },
  { id: PURCHASE_PROPOSAL_N_QUOTE_STATUSES.NEW, label: "Mới tạo" },
  { id: PURCHASE_PROPOSAL_N_QUOTE_STATUSES.DONE, label: "Hoàn thành" },
];

export const PAYMENT_PROPOSAL_STATUSES_OPTIONS = [
  { id: PAYMENT_PROPOSAL_STATUSES.SUGGEST, label: "Đề xuất" },
  { id: PAYMENT_PROPOSAL_STATUSES.APPROVED, label: "Xác nhận" },
  { id: PAYMENT_PROPOSAL_STATUSES.DENIED, label: "Không xác nhận" },
];

export const ACCEPTANCE_STATUSES_OPTIONS = [
  { id: ACCEPTANCE_STATUSES.SUGGEST, label: "Đề xuất" },
  { id: ACCEPTANCE_STATUSES.ACCEPTANCE, label: "Nghiệm thu" },
];

export const PAYMENT_PHASES_OPTIONS = [
  { id: PAYMENT_PHASES.SUGGEST, label: "Đề xuất thanh toán" },
  { id: PAYMENT_PHASES.ACCOUNTANT, label: "Kế toán thanh toán" },
  { id: PAYMENT_PHASES.FINANCE_DIRECTOR, label: "Giám đốc tài chính" },
  { id: PAYMENT_PHASES.GENERAL_DIRECTOR, label: "Tổng giám đốc" },
  { id: PAYMENT_PHASES.TREASURER, label: "Thủ quỹ thanh toán" },
];
