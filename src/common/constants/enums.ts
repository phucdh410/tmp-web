export enum CODE_TYPES {
  QR_CODE = 0,
  BARCODE = 1,
}

export enum WARRANTY_LEVELS {
  DAY,
  MONTH,
  YEAR,
}

export enum PURCHASE_PROPOSAL_N_QUOTE_STATUSES {
  PENDING, //note: Đang xử lý
  NEW, //note: Mới tạo
  DONE, //note: Hoàn thành
}

export enum SORT_TYPES {
  DEFAULT = "default",
  ASCENDING = "asc",
  DESCENDING = "desc",
}

export enum ROOM_GROUP_SUGGEST_STATUSES {
  INIT = 1, //note: Tạo mới
  APPROVED, //note: Duyệt
  DENIED = -1, //note: Không duyệt
}

export enum PAYMENT_PROPOSAL_STATUSES {
  SUGGEST = 1, //note: Đề xuất
  APPROVED, //note: Xác nhận
  DENIED = -1, //note: Không xác nhận
}

export enum PAYMENT_PHASES {
  SUGGEST = 1, //note: Đề xuất thanh toán
  ACCOUNTANT, //note: Kế toán thanh toán
  FINANCE_DIRECTOR, //note: Giám đốc tài chính
  GENERAL_DIRECTOR, //note: Tổng giám đốc
  TREASURER, //note: Thủ quỹ thanh toán
}

export enum ACCEPTANCE_STATUSES {
  SUGGEST, //note: Đề xuất
  ACCEPTANCE, //note: Nghiệm thu
}

export enum TRANSFER_TYPES {
  INSIDE, //note: Luân chuyển nội bộ
  OUTSIDE, //note: Luân chuyển chi nhánh khác
}

export enum HANDOVER_STATUSES {
  INIT = 1, //note: Mới tạo
  DONE, //note: Hoàn thành
  REJECT = -1, //note: Từ chối
}

export enum IMPORT_ASSET_TYPES {
  BUY_NEW, //note: Mua mới
  RECALL, //note: Thu hồi về kho
}

export enum IMPORT_ASSET_STATUES {
  NEW = 1, //note: Tạo mới
  STORED, //note: Đã lưu kho
}

export enum EXPORT_ASSET_STATUES {
  NEW, //note: Mới tạo
  PENDING, //note: Đang xử lý
  DONE, //note: Hoàn thành
}
