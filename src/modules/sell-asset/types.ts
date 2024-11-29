import { SELL_ASSET_STATUES } from "@constants/enums";
import { IBasePaginationParams } from "@interfaces/request";

export interface IParams extends IBasePaginationParams {
  code?: string;
  warehouse_id?: number | "";
  status?: SELL_ASSET_STATUES | "";
  start_date?: string | Date | null;
  end_date?: string | Date | null;
}
