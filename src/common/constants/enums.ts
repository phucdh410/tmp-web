export enum CODE_TYPES {
  QR_CODE = 0,
  BARCODE = 1,
}

export enum WARRANTY_LEVELS {
  DAY,
  MONTH,
  YEAR,
}

export enum ASSET_PROPOSAL_STATUSES {
  REJECTED = 0,
  APPROVED = 1,
  WAITING_MANAGER = 2,
  WAITING_REGION_DIRECTOR = 3,
  WAITING_FINANCE_DIRECTOR = 4,
  WAITING_DIRECTOR = 5,
  WAITING_ASSET_DEPT = 6,
  WAITING_COUNCIL = 7,
  WAITING_PURCHASE = 8,
  WAITING_DELIVERY = 9,
  WAITING_ACCEPTANCE = 10,
  WAITING_PAYMENT = 11,
  WAITING_PAYMENT_PROPOSAL = 110,
  WAITING_PAYMENT_ACCOUNTANT = 111,
  WAITING_PAYMENT_FINANCE_DIRECTOR = 112,
  WAITING_PAYMENT_DIRECTOR = 113,
  WAITING_PAYMENT_TREASURER = 114,
}

export enum ASSET_PROPOSAL_TRACKING_STATUSES {
  REJECTED = 0,
  PENDING,
  APPROVED,
  LATE_APPROVED,
}

export enum ASSET_PROPOSAL_TYPES {
  REPLACE = 1, //note: Thay thế
  // NEW_BUY, //note: Mua mới
  KAIZEN, //note: Kaizen
  COMPENSATION, //note: Bổ sung định mức
}

export enum PURCHASED_PROPOSED_ASSET_STATUSES {
  BOUGHT_YET = "pending", //note: Chưa mua
  BOUGHT = "approved", //note: Đã mua
  NOT_BUY = "rejected", //note: Không mua
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

export enum SELL_ASSET_STATUES {
  NEW, //note: Mới tạo
  PENDING, //note: Đang xử lý
  DONE, //note: Hoàn thành
}

export enum ASSET_VALUATION_STATUES {
  NEW, //note: Mới tạo
  PENDING, //note: Đang xử lý
  DONE, //note: Hoàn thành
}

export enum ASSET_VALUATION_TYPES {
  REMAINING_DEPRECIATION = 1, //note: Còn khấu hao
  FULLY_DEPRECIATED, //note: Hết khấu hao
}

export enum STOCKTAKE_STATUES {
  NOT_YET = 1, //note: Chưa xác nhận
  DONE, //note: Hoàn thành
}

export enum STOCKTAKE_QUALITIES {
  DAMAGED = -1, //note: Bị hỏng
  WELL = 1, //note: Hoạt động tốt
  MAINTENANCE, //note: Đi bảo trì
}

export enum HANDOVER_PHASES {
  RECEIVER = 2, //note: Chi nhánh nhận tài sản
  ASSET_PART, //note: Bộ phận tài sản
}
