import { SELL_ASSET_STATUES } from "@constants/enums";

export interface IParams {
  page: number;
  limit: number;
  code?: string;
  warehouse_id?: number | "";
  status?: SELL_ASSET_STATUES | "";
  start_date?: string | Date | null;
  end_date?: string | Date | null;
}
