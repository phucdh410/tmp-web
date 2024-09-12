import { CODE_TYPES, WARRANTY_LEVELS } from "@constants/enums";
import { IReceiptPayload } from "@interfaces/receipts";
import dayjs from "dayjs";

export const defaultValues: IReceiptPayload = {
  id: "",
  code: "",
  name: "",
  store_code: "",
  reason: "",
  barcode: CODE_TYPES.BARCODE,
  category_id: "",
  vendor_id: "",
  note: "",
  date: dayjs().toDate(),
  warranty_date: dayjs().toDate(),
  warranty_duration: 0,
  warranty_level: WARRANTY_LEVELS.MONTH,
  properties: [],
  price: 0,
  unit: "",
  quantity: 1,
  amount: 0,
  depreciation_date: dayjs().toDate(),
  depreciation_duration: 0,
  depreciation_cost: 0,
  model: "",
  split_code: false,
  regions: [],
  documents: [],
};
